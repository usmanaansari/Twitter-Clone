import React from 'react'


function CreateUserFormComponent(){
    return(
        <main>
            <form class = "form-horizontal">
              <label class="col-md-4 label-default">Create an Account!</label>
              <div class = "form-group">
                <label class="col-md-4 control-label" for="emailsignupinput">Email</label>
                <div class="col-md-4">
                  <input id="emailsignupinput" name="emailsignupinput" type="text" placeholder="Enter an Email" class="form-control input-md" required/>
                </div>
              </div>
              <div class = "form-group">
                <label class="col-md-4 control-label" for="usernamesignupinput">Username</label>
                <div class="col-md-4">
                  <input id="usernamesignupinput" name="usernamesignupinput" type="text" placeholder="Enter a username" class="form-control input-md" required/>
                </div>
              </div>
              <div class = "form-group">
                <label class="col-md-4 control-label" for="passwordsignupinput">Password</label>
                <div class="col-md-4">
                    <input id="passwordsignupinput" name="passwordsignupinput" type="text" placeholder="Enter a password" class="form-control input-md" required/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-primary">Create an Account</button>
                </div>
              </div>
            </form>
        </main>
    )
}

export default CreateUserFormComponent