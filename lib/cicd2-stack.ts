import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import{CodePipeline,CodePipelineSource,ShellStep}from'aws-cdk-lib/pipelines';
import{ManualApprovalStep} from'aws-cdk-lib/pipelines';
import{MyPipelineAppStage} from './stage';


export class Cicd2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline  = new CodePipeline(this,'Pipeline',{
      pipelineName:'TestPipeline',
      synth:new ShellStep('Synth',{
        input:CodePipelineSource.gitHub('BlackStark2099/sampleCdkToolkit','main'),// Remember to ch
        commands:['npm ci',
                   'npm run build',
                   'npx cdk synth']
      }),
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