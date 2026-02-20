import 'dotenv/config';
import { RunnablePassthrough, RunnableLambda, RunnableSequence, RunnableMap } from "@langchain/core/runnables";

// 创建一个简单的 RunnableLambda
const chain = RunnableSequence.from([
  RunnableLambda.from((input) => ({ concept: input })),
  RunnableMap.from({
    original: new RunnablePassthrough(),
    processed: RunnableLambda.from((obj) => ({
      concept: obj.concept,
      upper: obj.concept.toUpperCase(),
      length: obj.concept.length,
    }))
  })
]);
const input = "hello world";
const result = await chain.invoke(input);
console.log(result);

