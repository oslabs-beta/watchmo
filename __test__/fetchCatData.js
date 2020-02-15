export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        "q1": [{ "timestamp": "str", "response": { "key": "value" }, "timing": [0, 3333] }],
        "q2": [{ "timestamp": "str", "response": { "key": "value" }, "timing": [0, 3333] }]
      }) 
  })
}