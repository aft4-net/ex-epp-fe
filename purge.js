console.log('sarting purge..');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
purge('usermanagement', fs,exec, path);
purge('clientmanagement', fs,exec, path);
purge('configurationmodule', fs,exec, path);
purge('epp-dashboard', fs,exec, path);
purge('resourcemanagement', fs,exec, path);
purge('projectmanagement', fs,exec, path);
purge('timesheet', fs,exec, path);

function purge (dir, fs, exec, path){
    //console.log('trying to purge in ' + dir + '..');
    dir = 'dist/apps/' + dir;

const files = getFilesFromPath('./' + dir +'/', '.css');
let data = [];

if (!files || files.length <= 0 || files === 'undefined') {
  return;
}

exec("purgecss -css "+dir+"/*.css --content "+ dir +"/index.html "+dir+"/*.js -o "+dir+"/", function (error, stdout, stderr) {
  console.log(dir + " purging is done");
});
}

function getFilesFromPath(dir, extension) {
  let files;
  try{
  files = fs.readdirSync(dir);
  return files.filter(e => path.extname(e).toLowerCase() === extension);
  }
  catch (error) {
  }
}