const storedPackages = {}
// list of packages we have prepared
storedPackages.pathD3 = {
  packageFolder: "./node_modules/d3/dist/",
  packageFiles: {
    default: "d3.js",
    d3js: "d3.js", 
    d3minjs: "d3.min.js"
  }
}

// adding to html file
const htmlScriptImport = (foundPathString) => {
  '<script src="index.js"/>'
  const node = document.createElement("script")
  node.src = foundPathString
  // console.log(node)
  document.getElementById("headjs").appendChild(node)
}

// path string generator
const generatePath = (requestedPackage, specificFile) => {
  var pathString = ""
  if (storedPackages[requestedPackage] == undefined) {
    console.log("no such package")
    return null
  } else {
    let target = storedPackages[requestedPackage]
    let folderString = target.packageFolder
    let fileString = specificFile == undefined ? 
      target.packageFiles.default : 
      target.packageFiles[specificFile]
    pathString = folderString + fileString
  }
  htmlScriptImport(pathString)
}

//////////////
//-d3 it up-//
//////////////

const createSamp = () => {
  const svg = d3.select('#canvas')
  const rect = svg.append("rect")
    .attr('x', 25)
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', 40)
    .attr('fill', 'blue')
}



///////////////////////
// data stuff arrays //
///////////////////////

var sampleArray = []

const checkArray = () => {
  if (sampleArray.length == 0) return console.log("It's empty yo") 
  console.log(sampleArray)
}

// find a way to not call the index 0 for the shallow copy
const checkArrayLastValue = () => {
  if (sampleArray.length == 0) return console.log("It's empty yo")
  let element = sampleArray.slice(-1)
  console.log(sampleArray.length)
  console.log(element[0].name)
  console.log(element[0].value)
}

const addToArray = (name, value) => {
  if (name == null) name = ''
  if (value == null) value = null
  sampleArray.push({name, value})
  checkArrayLastValue()
}

// treemapping /*
// creating treemap with 1d Array
// tmArr = treemapArray = [] */
let tmArr = [1,2,3,4,5,6,7]
let tmData = {
  children: tmArr.map(lmnt => {
    return {item: lmnt}
  })
}

const root = d3.hierarchy(tmData)
root.sum(d => d.item)

d3.treemap()
  .size([400, 200])
  .paddingOuter(10)
(root) 

d3.select('svg g')
  .selectAll('rect')
  .data(root.descendants())
  .enter()
  .append('rect')
  .attr('x', d => d.x0)
  .attr('y', d => d.y0)
  .attr('width', d => d.x1 - d.x0)
  .attr('height', d => d.y1 - d.y0)