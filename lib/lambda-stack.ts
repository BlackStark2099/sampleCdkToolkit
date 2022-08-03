import * as cdk from 'aws-cdk-lib';
import{Construct}from'constructs';
  import {Function,InlineCode,Runtime,Code,AssetCode} from 'aws-cdk-lib/aws-lambda';
import * as path from'path';
import { AssetHashType } from 'aws-cdk-lib';
export class MyLambdaStack extends cdk.Stack{
    constructor(scope:Construct, id:string,stageName:string,props ?: cdk.StackProps){
      super(scope,id,props);
      new Function(this,'LambdaFunction1',{
        runtime:Runtime.PYTHON_3_8,
        handler:'handler.handler',
        code: Code.fromAsset(path.join(__dirname,"lambda")),
        environment:{"stageName":stageName}
        
      });
      
      new Function(this,'LambdaFunction2',{
        runtime:Runtime.PYTHON_3_8,
        handler:'handler.handler',
        code: Code.fromAsset(path.join(__dirname,"lambda2")),
        environment:{"stageName":stageName}
      });
     
    }
}