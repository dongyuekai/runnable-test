import 'dotenv/config';
import { RunnableMap, RunnableLambda } from '@langchain/core/runnables'
import { PromptTemplate } from '@langchain/core/prompts'

const addOne = RunnableLambda.from(input => input.num + 1)
const multiplyTwo = RunnableLambda.from(input => input.num * 2)
const square = RunnableLambda.from((input) => input.num * input.num);

const greatTemplate = PromptTemplate.fromTemplate('你好，{name}')
const weatherTemplate = PromptTemplate.fromTemplate('今天天气{weather}.')

// 创建 RunnableMap 并行执行多个runnable
const runnableMap = RunnableMap.from({
  // 数学运算
  add: addOne,
  multiply: multiplyTwo,
  square: square,

  // prompt格式化
  greeting: greatTemplate,
  weather: weatherTemplate
})

// 测试输入
const input = {
  name: 'Alice',
  weather: '晴朗',
  num: 3
}

// 执行 RunnalbeMap
const result = await runnableMap.invoke(input)

console.log('✅ 最终结果:');
console.log(result);
