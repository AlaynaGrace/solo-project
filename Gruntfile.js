module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          //destination file : target file
          'server/public/assets/scripts/clientapp.min.js': ['client/assets/scripts/clientapp.js'],
          'server/public/assets/scripts/controllers/email.controller.min.js': ['client/assets/scripts/controllers/email.controller.js'],
          'server/public/assets/scripts/controllers/login.controller.min.js': ['client/assets/scripts/controllers/login.controller.js'],
          'server/public/assets/scripts/controllers/pet.controller.min.js': ['client/assets/scripts/controllers/pet.controller.js'],
          'server/public/assets/scripts/controllers/user.controller.min.js': ['client/assets/scripts/controllers/user.controller.js'],
          'server/public/assets/scripts/services/email.service.min.js': ['client/assets/scripts/services/email.service.js'],
          'server/public/assets/scripts/services/admin.service.min.js': ['client/assets/scripts/services/admin.service.js'],
          'server/public/assets/scripts/services/file.service.min.js': ['client/assets/scripts/services/file.service.js'],
          'server/public/assets/scripts/services/pet.service.min.js': ['client/assets/scripts/services/pet.service.js'],
          'server/public/assets/scripts/services/register.service.min.js': ['client/assets/scripts/services/register.service.js'],
          'server/public/assets/scripts/services/text.service.min.js': ['client/assets/scripts/services/text.service.js'],
          'server/public/assets/scripts/services/userList.service.min.js': ['client/assets/scripts/services/userList.service.js'],
          'server/public/assets/scripts/services/favorites.service.min.js': ['client/assets/scripts/services/favorites.service.js']

          //services and controllers need to be separate
        }
      }
    },
    watch: {
      files: ['client/assets/*.js', 'client/assets/controllers/*.js', 'client/assests/services/*.js'],
      tasks: ['uglify']
    },
    // copy: {
    //   main: {
    //     files: [
    //       {expand:true, cwd: 'node_modules',src: ['bootstrap/**'], dest: 'server/public/vendors'}
    //     ]
    //   }
    // }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-copy');


  //in terminal: grunt name
  // in code: grunt.registerTask('name',['watch']);

//can just type 'grunt' in terminal
//must put other tasks in front of watch because watch blocks
  grunt.registerTask('default',['watch']);
};
