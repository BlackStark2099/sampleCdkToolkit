import * as cdk from 'aws-cdk-lib';
import{Construct}from'constructs';
  import {Function,InlineCode,Runtime,Code,AssetCode} from 'aws-cdk-lib/aws-lambda';
import * as path from'path';
import { AssetHashType } from 'aws-cdk-lib';
export class MyLambdaStack extends cdk.Stack{
    constructor(scope:Construct, id:string,stageName:string,props ?: cdk.StackProps){
      super(scope,id,props);
      new Function(this,'LambdaFunction1',{
        runtime:Runtime.NODEJS_12_X,
        handler:'handler.handler',
        code: new AssetCode(path.join(__dirname,"lambda"),{
          assetHashType: AssetHashType.CUSTOM,
          assetHash: "helloewwww"
        }),
        environment:{"stageName":stageName}
      });
      new Function(this,'LambdaFunction2',{
        runtime:Runtime.NODEJS_12_X,
        handler:'handler_c2.handler',
        code: new AssetCode(path.join(__dirname,"lambda2"),{
          assetHashType: AssetHashType.CUSTOM,
          assetHash: "helloewwww1"
        }),
        environment:{"stageName":stageName}
      });
      new Function(this,'LambdaFunction3',{
        runtime:Runtime.NODEJS_12_X,
        handler:'handler_c3.handler',
        code: new AssetCode(path.join(__dirname,"lambda3"),{
          assetHashType: AssetHashType.CUSTOM,
          assetHash: "helloewwww2"
        }),
        environment:{"stageName":stageName}
      });
      // new Function(this,'LambdaFunction4',{
      //   runtime:Runtime.NODEJS_12_X,
      //   handler:'handler_c4.handler',
      //   code: Code.fromAsset(path.join(__dirname,'lambda4')),
      //   environment:{"stageName":stageName}
      //  });
    }
}