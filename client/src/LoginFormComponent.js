import React from 'react'

function LoginFormComponent(){
    return (
        <main>
            <form class = "form-horizontal">
              <label class="col-md-4 label-default">Log in!</label>
              <div class = "form-group">
                <label class="col-md-4 control-label" for="usernameinput">Username</label>
                <div class="col-md-4">
                  <input id="usernameinput" name="usernameinput" type="text" placeholder="Enter your username" class="form-control input-md" required/>
                </div>
              </div>
              <div class = "form-group">
                <label class="col-md-4 control-label" for="passwordinput">Password</label>
                <div class="col-md-4">
                    <input id="passwordinput" name="passwordinput" type="text" placeholder="Enter your password" class="form-control input-md" required/>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="submit" class="btn btn-primary">Log in</button>
                </div>
              </div>
            </form>
        </main>
    )
}

export default LoginFormComponent