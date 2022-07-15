import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import{CodePipeline,CodePipelineSource,ShellStep,CodeBuildOptions}from'aws-cdk-lib/pipelines';
import{ManualApprovalStep} from'aws-cdk-lib/pipelines';
import{MyPipelineAppStage} from './stage';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';



export class Cicd2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const invalidateBuildProject = new codebuild.PipelineProject(this, `InvalidateProject`, {
      
      cache: codebuild.Cache.local(codebuild.LocalCacheMode.DOCKER_LAYER, codebuild.LocalCacheMode.CUSTOM),

      buildSpec: codebuild.BuildSpec.fromObject({
        version: '0.2',
        phases: {
          build: {
            commands:[''],
          },
        },
        cache: {
          paths: [
            '/**/*',
          ],
        },
      }),
    });
    
    // Add Cloudfront invalidation permissions to the project
    // const distributionArn = `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`;
    // invalidateBuildProject.addToRolePolicy(new iam.PolicyStatement({
    //   resources: [distributionArn],
    //   actions: [
    //     'cloudfront:CreateInvalidation',
    //   ],
    // }));
    
    // Create the pipeline (here only the S3 deploy and Invalidate cache build)
    // const deployBucket = new s3.Bucket(this, 'DeployBucket');
    // const deployInput = new codepipeline.Artifact();
    

    const pipeline  = new CodePipeline(this,'Pipeline',{
      pipelineName:'TestPipeline',
      synth:new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('BlackStark2099/sampleCdkToolkit','main'),// Remember to ch
        commands:['npm ci',
        'npm run build',
        'npx cdk synth'],
      }),
      
      codeBuildDefaults:{
        buildEnvironment: {
          computeType: codebuild.ComputeType.LARGE
        },
      }
      
    });
    const stage = new MyPipelineAppStage (this,"test",{
      env:{account:"637774830294",region:"us-east-1"}
    })
    const testingstage=pipeline.addStage(stage);
    
    testingstage.addPost(new ManualApprovalStep('Manual approval before production'));


    const prodstage=pipeline.addStage(new MyPipelineAppStage(this,"prod",{
      env:{account:"637774830294",region:"us-east-1"}
    }));

    

  }
}