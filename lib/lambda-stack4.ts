import * as cdk from 'aws-cdk-lib';
import{Construct}from'constructs';
  import {Function,InlineCode,Runtime,Code} from 'aws-cdk-lib/aws-lambda';
import * as path from'path';
export class MyLambdaStack4 extends cdk.Stack{
    constructor(scope:Construct, id:string,stageName:string,props ?: cdk.StackProps){
      super(scope,id,props);
        new Function(this,'LambdaFunction4',{
        runtime:Runtime.NODEJS_12_X,
        handler:'handler_c4.handler',
        code: Code.fromAsset(path.join(__dirname,'lambda')),
        environment:{"stageName":stageName}
       });
    }
}