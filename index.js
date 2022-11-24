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
  console.log(node)
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

//
// d3 it up
//
const createSamp = () => {
  const svg = d3.select('#canvas')
  const rect = svg.append("rect")
    .attr('x', 25)
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', 40)
    .attr('fill', 'blue')
}

