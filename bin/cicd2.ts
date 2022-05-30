import 'source-map-support/register';
import * as cdk from'aws-cdk-lib';
import { Cicd2Stack } from '../lib/cicd2-stack';
const app = new cdk.App();
new Cicd2Stack(app, 'Cicd2Stack', {
  env:{
    account:'637774830294',
    region:'us-east-1',
 }
});

app.synth();