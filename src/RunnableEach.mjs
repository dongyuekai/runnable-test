import 'dotenv/config';
import { RunnableEach, RunnableLambda, RunnableSequence } from "@langchain/core/runnables";

const toUpperCase = RunnableLambda.from((input) => input.toUpperCase());
const addGreeting = RunnableLambda.from((input) => `你好，${input}！`);

const processItem = RunnableSequence.from([
  toUpperCase,
  addGreeting,
]);

// 使用RunnableEach对数组中的每个元素应用这个链
const chain = new RunnableEach({
  bound: processItem,
});

const inputArray = ["Alice", "Bob", "Charlie"];
const result = await chain.invoke(inputArray);
console.log('✅ RunnableEach - 数组元素处理:');
console.log('输入:', inputArray);
console.log('输出:', result);
