// Create a Cloudfront Web Distribution
import * as cloudfront from '@aws-cdk/aws-cloudfront';
declare const distribution: cloudfront.Distribution;

// Create the build project that will invalidate the cache
const invalidateBuildProject = new codebuild.PipelineProject(this, `InvalidateProject`, {
  buildSpec: codebuild.BuildSpec.fromObject({
    version: '0.2',
    phases: {
      build: {
        commands:[
          'aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"',
          // Choose whatever files or paths you'd like, or all files as specified here
        ],
      },
    },
  }),
  environmentVariables: {
    CLOUDFRONT_ID: { value: distribution.distributionId },
  },
});

// Add Cloudfront invalidation permissions to the project
const distributionArn = `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`;
invalidateBuildProject.addToRolePolicy(new iam.PolicyStatement({
  resources: [distributionArn],
  actions: [
    'cloudfront:CreateInvalidation',
  ],
}));

// Create the pipeline (here only the S3 deploy and Invalidate cache build)
const deployBucket = new s3.Bucket(this, 'DeployBucket');
const deployInput = new codepipeline.Artifact();
new codepipeline.Pipeline(this, 'Pipeline', {
  stages: [
    // ...
    {
      stageName: 'Deploy',
      actions: [
        new codepipeline_actions.S3DeployAction({
          actionName: 'S3Deploy',
          bucket: deployBucket,
          input: deployInput,
          runOrder: 1,
        }),
        new codepipeline_actions.CodeBuildAction({
          actionName: 'InvalidateCache',
          project: invalidateBuildProject,
          input: deployInput,
          runOrder: 2,
        }),
      ],
    },
  ],
});