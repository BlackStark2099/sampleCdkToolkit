import * as cdk from'aws-cdk-lib';
import{Construct}from"constructs";
import{MyLambdaStack}from'./lambda-stack';
import { MyLambdaStack2 } from './lambda-stack2';
import { MyLambdaStack3 } from './lambda-stack3';
import { MyLambdaStack4 } from './lambda-stack4';

export class MyPipelineAppStage extends cdk.Stage{
    constructor(scope:Construct,stageName:string,props ?: cdk.StageProps){
      super(scope,stageName,props);
      const lambdastack=new MyLambdaStack(this,'LambdaStack',stageName);
      const lambdastack2=new MyLambdaStack2(this,'LambdaStack2',stageName);
      const lambdastack3=new MyLambdaStack3(this,'LambdaStack3',stageName);
      const lambdastack4=new MyLambdaStack4(this,'LambdaStack4',stageName);
      
   }
}