import * as cdk from '@aws-cdk/core'
import * as events from '@aws-cdk/aws-events'
import * as targets from '@aws-cdk/aws-events-targets'
import * as lambda from '@aws-cdk/aws-lambda'
import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'

export class CdkCronLambdaStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const functionName = 'cdk-test'
    const lambdaFunction = new lambda.Function(this, functionName + '-function', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'index.handler',
      code: lambda.Code.asset('lambda'),
      functionName
    })

    const topic = new sns.Topic(this, functionName + '-topic', {
      displayName: 'Lambda subscription topic',
      topicName: functionName + '-topic'
    })
    topic.addSubscription(new subs.LambdaSubscription(lambdaFunction))

    const eventRule = new events.Rule(this, functionName + '-rule', {
      schedule: events.Schedule.expression('rate(2 minutes)') //一旦2分間の定期実行
    })
    eventRule.addTarget(new targets.SnsTopic(topic, {
      message: events.RuleTargetInput.fromText('cdk-test')
    }))
  }
}
