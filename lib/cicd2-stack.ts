import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Function,InlineCode,Runtime,Code} from 'aws-cdk-lib/aws-lambda';
import * as path from 'path'
import * as fs from 'fs'

import{CodePipeline,CodePipelineSource,ShellStep,CodeBuildOptions}from'aws-cdk-lib/pipelines';
import{ManualApprovalStep} from'aws-cdk-lib/pipelines';
import{MyPipelineAppStage} from './stage';
import {parse, stringify, toJSON, fromJSON} from 'flatted';

// CJS

import * as codebuild from 'aws-cdk-lib/aws-codebuild';

import * as assets from 'aws-cdk-lib/aws-s3-assets';
import { aws_appflow as appflow } from 'aws-cdk-lib';


export class Cicd2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
 
    const pipeline  = new CodePipeline(this,'Pipeline',{
      pipelineName:'TestPipeline',
      synth:new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('BlackStark2099/sampleCdkToolkit','main'),// Remember to ch
        commands:['npm ci',
        'npm run build',
        'npx cdk synth'],
      }),

    });
    
    
    const stage = new MyPipelineAppStage (this,"test",{
      env:{account:"637774830294",region:"us-east-1" }
    })
    const testingstage=pipeline.addStage(stage);
    
    testingstage.addPost(new ManualApprovalStep('Manual approval before production'));

    const prodstage=pipeline.addStage(new MyPipelineAppStage(this,"prod",{
      env:{account:"637774830294",region:"us-east-1"}
    }));

    

  }
}