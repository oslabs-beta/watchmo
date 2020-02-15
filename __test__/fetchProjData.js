export default function() {
  return Promise.resolve({
    json: () =>
      Promise.resolve(
        ["project1", "project2"]
      ) 
  })
}