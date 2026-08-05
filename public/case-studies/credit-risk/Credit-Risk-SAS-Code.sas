/*  Import Dataset*/
proc import datafile="C:\Users\sidhu\Desktop\Multivariate Analysis\final project data\Default of credit card clients.csv"
    out=credit_data
    dbms=csv
    replace;
    getnames=yes;
run;

 /* Data Cleaning – Convert Variables*/
data credit_clean;
    set credit_data;

    /* Remove symbols from Credit Limit */
    Credit_Limit_Clean = compress(Credit_Limit, '$,');
    Credit_Limit_Num = input(Credit_Limit_Clean, best12.);

    /* Recode Default Payment */
    if Default_Payment = "Yes" then Default_Payment_Num = 1;
    else if Default_Payment = "No" then Default_Payment_Num = 0;
run;

 /* Summary Statistics and Visualizations*/
proc means data=credit_clean n mean median std min max;
    var Credit_Limit_Num Age;
run;

proc freq data=credit_clean;
    tables Education Default_Payment;
run;

ods graphics on;
proc sgplot data=credit_clean;
    vbox Credit_Limit_Num / category=Default_Payment;
    xaxis label="Default Status";
    yaxis label="Credit Limit (NT$)";
    title "Distribution of Credit Limit by Default Status";
run;

proc sort data=credit_clean;
    by Education;
run;

proc means data=credit_clean noprint nway;
    class Education;
    var Default_Payment_Num;
    output out=education_defaults mean=Default_Rate;
run;

proc sgplot data=education_defaults;
    vbar Education / response=Default_Rate datalabel;
    yaxis label="Default Rate";
    xaxis label="Education Level";
    title "Default Rate by Education Level";
run;

 /* Create PCA Input Dataset – Convert CHAR to NUM*/
data credit_pca;
    set credit_clean;

    array payc{6} PayAmount_Apr PayAmount_May PayAmount_Jun PayAmount_Jul PayAmount_Aug PayAmount_Sep;
    array payn{6} PayAmt_Apr_N PayAmt_May_N PayAmt_Jun_N PayAmt_Jul_N PayAmt_Aug_N PayAmt_Sep_N;

    array billc{6} BillAmt_Apr BillAmt_May BillAmt_Jun BillAmt_Jul BillAmt_Aug BillAmt_Sep;
    array billn{6} BillAmt_Apr_N BillAmt_May_N BillAmt_Jun_N BillAmt_Jul_N BillAmt_Aug_N BillAmt_Sep_N;

    do i = 1 to 6;
        payn{i} = input(compress(payc{i}, ' $,'), best12.);
        billn{i} = input(compress(billc{i}, ' $,'), best12.);
    end;

    drop i;
run;

/*----------------------------------------------
  Standardize Variables for PCA
------------------------------------------------*/
proc standard data=credit_pca mean=0 std=1 out=credit_std;
    var 
        PayStatus_Apr PayStatus_May PayStatus_Jun PayStatus_Jul PayStatus_Aug PayStatus_Sep
        PayAmt_Apr_N PayAmt_May_N PayAmt_Jun_N PayAmt_Jul_N PayAmt_Aug_N PayAmt_Sep_N
        BillAmt_Apr_N BillAmt_May_N BillAmt_Jun_N BillAmt_Jul_N BillAmt_Aug_N BillAmt_Sep_N;
run;

 /* Run PCA and Generate Scree Plot*/
ods graphics on;
proc princomp data=credit_std out=pca_scores plots=scree(unpack);
    var 
        PayStatus_Apr PayStatus_May PayStatus_Jun PayStatus_Jul PayStatus_Aug PayStatus_Sep
        PayAmt_Apr_N PayAmt_May_N PayAmt_Jun_N PayAmt_Jul_N PayAmt_Aug_N PayAmt_Sep_N
        BillAmt_Apr_N BillAmt_May_N BillAmt_Jun_N BillAmt_Jul_N BillAmt_Aug_N BillAmt_Sep_N;
run;

/* Add default status to PCA scores for clustering */
data pca_scores;
    merge pca_scores credit_clean(keep=Default_Payment Default_Payment_Num);
run;

/*  Cluster Analysis – Stratified Sample*/
proc sort data=pca_scores out=sorted_scores;
    by Default_Payment;
run;

proc surveyselect data=sorted_scores out=cluster_sample 
    method=srs sampsize=(500 500) seed=123;
    strata Default_Payment;
run;

 /* Standardize PCA Components for Clustering*/
proc standard data=cluster_sample mean=0 std=1 out=cluster_std;
    var Prin1 Prin2 Prin3;
run;

/*  Hierarchical Clustering – Ward’s Method*/
ods graphics on;
proc cluster data=cluster_std method=ward outtree=tree plots(only maxpoints=0)=den(height=rsq);
    var Prin1 Prin2 Prin3;
run;


/*  Cut Tree and Create Cluster Labels*/
proc tree data=tree nclusters=3 out=cluster_final;
    copy Prin1 Prin2 Prin3;
run;


/*  Merge Back Default_Payment for Profiling*/
proc sort data=cluster_final; by Prin1 Prin2 Prin3; run;
proc sort data=cluster_sample; by Prin1 Prin2 Prin3; run;

data cluster_final;
    merge cluster_final(in=a) cluster_sample(keep=Prin1 Prin2 Prin3 Default_Payment Default_Payment_Num);
    by Prin1 Prin2 Prin3;
    if a;
run;


  /*Cluster Profiling*/
proc freq data=cluster_final;
    tables cluster;
run;

proc means data=cluster_final;
    class cluster;
    var Prin1 Prin2 Prin3;
run;

proc freq data=cluster_final;
    tables cluster*Default_Payment / nocol norow nopercent;
run;

proc cluster data=cluster_std method=ward outtree=tree plots(only)=den(height=rsq);
    var Prin1 Prin2 Prin3;
run;

/* Discriminant Analysis using PCA scores and cluster labels */
proc discrim data=cluster_final method=normal pool=yes crossvalidate;
    class cluster;
    var Prin1 Prin2 Prin3;
run;
