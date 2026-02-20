import 'dotenv/config';
import { RunnableBranch, RunnableLambda } from '@langchain/core/runnables'

// 创建添加判断函数
const isPositive = RunnableLambda.from(input => input > 0)
const isNegative = RunnableLambda.from(input => input < 0)
const isEven = RunnableLambda.from(input => input % 2 === 0)

// 创建分支处理函数
const handlePositive = RunnableLambda.from((input) => `正数: ${input} + 10 = ${input + 10}`);
const handleNegative = RunnableLambda.from((input) => `负数: ${input} - 10 = ${input - 10}`);
const handleEven = RunnableLambda.from((input) => `偶数: ${input} * 2 = ${input * 2}`);
const handleDefault = RunnableLambda.from((input) => `默认: ${input}`);

// 创建 RunnableBranch
const runnableBranch = RunnableBranch.from([
  [isEven, handleEven],       // 先判断偶数
  [isPositive, handlePositive],
  [isNegative, handleNegative],
  handleDefault
])

// 测试不同的输入
const testCases = [5, -3, 4, 0]

for (const testCase of testCases) {
  const result = await runnableBranch.invoke(testCase)
  console.log(`输入: ${testCase} => 输出: ${result}`)
}