#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkCronLambdaStack } from '../lib/cdk-cron-lambda-stack';

const app = new cdk.App();
new CdkCronLambdaStack(app, 'CdkCronLambdaStack');
