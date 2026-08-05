/* Import dataset */
proc import datafile="C:\Users\sidhu\Desktop\Econometrics\Assignment 2\Assessment2_data_Option 1.xlsx"
	out=work.hardship_data
    dbms=xlsx
    replace;
    getnames=yes;
run;

/* View structure */
proc contents data=hardship_data;
run;
/* Summary statistics for continuous variables */
proc means data=hardship_data mean std min max maxdec=2;
    var age incomepos fcorganmm fcfinwatch;
run;

/* Frequencies for categorical control variables */
proc freq data=hardship_data;
    tables married employed ownhome highestedu / missing;
run;

/* Frequencies for binary hardship indicators */
proc freq data=hardship_data;
    tables finsoldpawn finrentmornpaid finwelfarehelp / missing;
run;

/* Histograms */
proc sgplot data=hardship_data;
    histogram age;
    title "Distribution of Age";
run;

proc sgplot data=hardship_data;
    histogram incomepos;
    title "Distribution of Income";
run;

proc sgplot data=hardship_data;
    histogram fcorganmm;
    title "Distribution of Financial Goal-Setting Behavior";
run;

proc sgplot data=hardship_data;
    histogram fcfinwatch;
    title "Distribution of Financial Monitoring Behavior";
run;

/* Bar charts for hardship outcomes */
proc sgplot data=hardship_data;
    vbar finsoldpawn / stat=percent;
    title "Proportion of Respondents Who Sold or Pawned Items";
run;

proc sgplot data=hardship_data;
    vbar finrentmornpaid / stat=percent;
    title "Proportion of Respondents Who Missed Rent or Mortgage Payments";
run;

proc sgplot data=hardship_data;
    vbar finwelfarehelp / stat=percent;
    title "Proportion of Respondents Who Relied on Welfare Support";
run;

/* Group-wise comparison */
proc sgpanel data=hardship_data;
    panelby highestedu / layout=panel rows=1 columns=7;
    vbar finsoldpawn / stat=percent;
    title "Sold or Pawned Items by Education Level";
run;

proc sgpanel data=hardship_data;
    panelby employed / layout=columnlattice onepanel;
    vbar finwelfarehelp / stat=percent;
    title "Relied on Welfare by Employment Status";
run;
/* Create income band variable */
data hardship_data;
    set hardship_data;
    length incomeband $15;
    if incomepos < 20000 then incomeband = "Below 20k";
    else if incomepos < 40000 then incomeband = "20k–39k";
    else if incomepos < 60000 then incomeband = "40k–59k";
    else if incomepos < 80000 then incomeband = "60k–79k";
    else if incomepos < 100000 then incomeband = "80k–99k";
    else incomeband = "100k+";
run;

/* Model 1: Monitoring × Marital Status on Asset Liquidation */
proc logistic data=hardship_data;
    class married (ref='0') / param=ref;
    model finsoldpawn(event='1') = fcfinwatch married fcfinwatch*married
                                   age incomepos employed ownhome highestedu;
run;

/* Model 2: Goal Setting × Education on Rent/Mortgage Payment */
proc logistic data=hardship_data;
    class highestedu (ref='0') / param=ref;
    model finrentmornpaid(event='1') = fcorganmm highestedu fcorganmm*highestedu
                                       age incomepos married employed ownhome;
run;

/* Model 3: Monitoring × Employment on Welfare Help */
proc logistic data=hardship_data;
    class employed (ref='1') / param=ref;
    model finwelfarehelp(event='1') = fcfinwatch employed fcfinwatch*employed
                                      age incomepos married ownhome highestedu;
run;

/* Model 4: Goal Setting × Income Level on Asset Liquidation */
proc logistic data=hardship_data;
    model finsoldpawn(event='1') = fcorganmm incomepos fcorganmm*incomepos
                                   age married employed ownhome highestedu;
run;

/* Lack of fit test for each model */
proc logistic data=hardship_data;
    class married (ref='0') / param=ref;
    model finsoldpawn(event='1') = fcfinwatch married fcfinwatch*married
                                   age incomepos employed ownhome highestedu
                                   / lackfit;
run;

proc logistic data=hardship_data;
    class highestedu (ref='0') / param=ref;
    model finrentmornpaid(event='1') = fcorganmm highestedu fcorganmm*highestedu
                                       age incomepos employed ownhome married
                                       / lackfit;
run;

proc logistic data=hardship_data;
    class employed (ref='0') / param=ref;
    model finwelfarehelp(event='1') = fcfinwatch employed fcfinwatch*employed
                                      age incomepos ownhome highestedu married
                                      / lackfit;
run;

proc logistic data=hardship_data;
    model finsoldpawn(event='1') = fcorganmm incomepos fcorganmm*incomepos
                                   age employed ownhome highestedu married
                                   / lackfit;
run;

/* Output predicted probabilities for interaction plot */
proc logistic data=hardship_data outmodel=logit_model1;
    class married (ref='0') / param=ref;
    model finsoldpawn(event='1') = fcfinwatch married fcfinwatch*married 
                                   age incomepos employed ownhome highestedu;
    output out=pred_out1 pred=predprob;
run;

/* Plot predicted probabilities */
proc sgplot data=pred_out1;
    loess x=fcfinwatch y=predprob / group=married;
    xaxis label="Financial Monitoring (fcfinwatch)";
    yaxis label="Predicted Probability of Asset Liquidation";
    title "Predicted Probability by Marital Status";
run;

/* VIF for Model 1 */
proc reg data=hardship_data;
    model fcfinwatch = married age incomepos employed ownhome highestedu / vif;
run;

/* VIF for Model 2 */
proc reg data=hardship_data;
    model fcorganmm = highestedu age incomepos employed ownhome married / vif;
run;

/* VIF for Model 3 */
proc reg data=hardship_data;
    model fcfinwatch = employed age incomepos ownhome highestedu married / vif;
run;

/* VIF for Model 4 */
proc reg data=hardship_data;
    model fcorganmm = incomepos age employed ownhome highestedu married / vif;
run;
