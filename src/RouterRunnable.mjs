import 'dotenv/config';
import { RouterRunnable, RunnableLambda } from '@langchain/core/runnables'

// 创建两个简单的 RunnableLambda
const toUpperCase = RunnableLambda.from((input) => input.toUpperCase());
const reverseText = RunnableLambda.from((input) => input.split('').reverse().join(''));

// 创建RouterRunnable，根据key选择要调用的runnable
const router = new RouterRunnable({
  runnables: {
    toUpperCase,
    reverseText
  }
})

// 测试： 调用toUpperCase
const result2 = await router.invoke({ key: 'toUpperCase', input: 'Hello World' });
console.log('toUpperCase 结果:', result2);
// 测试： 调用reverseText
const result1 = await router.invoke({ key: 'reverseText', input: 'Hello World' });
console.log('reverseText 结果:', result1);

