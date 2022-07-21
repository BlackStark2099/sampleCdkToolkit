// import * as cdk from'aws-cdk-lib';
// import{Construct}from"constructs";
// import{MyLambdaStack}from'./lambda-stack';
// import * as cAction from  '@aws-cdk/aws-codepipeline-actions' 
// import * as codebuild from 'aws-cdk-lib/aws-codebuild';
// import { Action} from 'aws-cdk-lib/aws-codepipeline';
// import { Artifact } from '@aws-cdk/aws-codepipeline';
// export class MyDeployStage extends cdk.Stage{
//     constructor(scope:Construct,stageName:string,invalidateBuildProject:codebuild.PipelineProject,deployInput: Artifact,props ?: cdk.StageProps){
//       super(scope,stageName,props);
//       Action:[
//         new cAction.CodeBuildAction({
//             actionName: 'InvalidateCache',
//             project: invalidateBuildProject,
//             input: deployInput,
//             runOrder: 2,
//           }),
//       ]
      
//    }
// }