# Solo Project

## What's left

* Fix register page (have to click register twice for it to work)
* Continue styling so that it continues to look nice
* Make a real readme
* Use grunt to minify everything so that it runs faster
* Be able to upload images from computer
* Create tests
* Actually explain what the app does in an eloquent fashion


## Uploading images from computer

* Use these notes to help: https://docs.google.com/document/d/1W3VgPf0uh5pcak1hthdx-yHFQbqHji3fpBykw9N1DY0/edit#heading=h.er11k92ufgzk
* Notes

```

File Uploads
Handling image/file uploads has many components and has been solved repeatedly in many different ways. Regardless of the cloud service you want to use to store the file, you need to handle:

  1. Use a file input form element to allow user to choose a local file
  2. Get this file to your server with a POST request
  3. On the server, you need to use a middleware that supports multi-part forms (multer is an example). Body Parser does NOT do this.
  4. Take the file data and save it on the local file system temporarily
  5. Upload this file to your storage API of choice
  6. Store the URL returned by the upload process in your database so you can use it in the image src attribute on the DOM
  7. Delete the temporary file

Example using ngFileUpload and Multer

A MEAN stack example of how to upload a file from a form in Angular JS using ngFileupload, and saving the file to a folder using Multer in Express/Node. Written by a former Prime instructor.
  * https://github.com/NukaPunk/mean-multer-ngf


Multer S3 (npm package)

Uses Node/Express, Multer to upload to AWS S3 (Amazon Web Services Simple Storage Service)

  * https://www.npmjs.com/package/multer-s3
  * http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-examples.html


FileStack

Dynamically program file uploads from over 20+ cloud providers. Programmatically define uploading capabilities on a per instance basis.
  * https://www.filestack.com/
  * https://www.filestack.com/services/file-uploader


Node/Express, Angular and Cloudinary

  * http://patrickrileyblogs.blogspot.com/2015/08/building-profile-photo-upload-with.html


Uploadcare Widget
  * https://uploadcare.com/



```
