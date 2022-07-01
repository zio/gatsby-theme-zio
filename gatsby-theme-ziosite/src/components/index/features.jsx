import * as React from "react"

const features = [
  {
    title: 'High-performance',
    content: 'Build scalable applications with 100x the performance of Scala’s Future',
  },
  {
    title: 'Type-safe',
    content: 'Use the full power of the Scala compiler to catch bugs at compile time',
  },
  {
    title: 'Concurrent',
    content: 'Easily build concurrent apps without deadlocks, race conditions, or complexity',
  },
  {
    title: 'Asynchronous',
    content: 'Write sequential code that looks the same whether it’s asynchronous or synchronous',
  },
  {
    title: 'Resource-safe',
    content: 'Build apps that never leak resources (including threads!), even when they fail',
  },
  {
    title: 'Testable',
    content: 'Inject test services into your app for fast, deterministic, and type-safe testing',
  },
  {
    title: 'Resilient',
    content: 'Build apps that never lose errors, and which respond to failure locally and flexibly',
  },
  {
    title: 'Functional',
    content: 'Rapidly compose solutions to complex problems from simple building blocks',
  },
];

const Features = () => { 
  const inner = features.map( (f) => {
    return (
      <div className="container p-8">
        <h1 className="text-center text-secondary-600 font-bold text-2xl">{f.title}</h1>
        <p className="text-center text-xl mt-4">{f.content}</p>
      </div>
    )
  })

  return (
    <div className="container w-full m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {inner}
    </div>
  )
}

export default Features