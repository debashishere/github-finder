
$(document).ready(function () {

    $("#searchUser").on('keyup', function (event) {
        let username = event.target.value

        // make ajax request to github (retuen promise)
        $.ajax({
            url: `https://api.github.com/users/${username}`,
            data: {
                client_id: '374ab2cb05fb8e932288',
                client_secret: '2eed97fa863963ac60d41c9f84d298800d4302ea'
            }
        }).done((user) => {
            $.ajax({
                // use the user get the repos
                url: `https://api.github.com/users/${username}/repos`,
                data: {
                    client_id: '374ab2cb05fb8e932288',
                    client_secret: '2eed97fa863963ac60d41c9f84d298800d4302ea',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done((repos) => {
                $.each(repos, (index, repo) => {
                    $('#repos').append(`
                    <div class="card">
                    <div class="row">
                      <div class="col-md-5 ml-1">
                        <strong>${repo.name}</strong>: ${repo.description}
                      </div>
                      <div class="col-md-4 ">
                        <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                        <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                      </div>
                      <div class="col-md-2">
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                      </div>
                    </div>
                  </div>
                    `)
                })
            })


            $('#profile').html(`
            <div class="card">
                <div class="panel-heading mt-2 mb-1">${user.name}</div>
                <div class="panel-body">
                    <div class="row" >
                        <div class="col-md-3">
                           <img class="thumbnail avatar border border-primary" src="${user.avatar_url}">
                           <div class="d-grid gap-2">
                           <a target="_blank" class="btn btn-block btn-outline-primary mt-4" href="${user.html_url}">View Profile</a>
                           </div>
                        </div>
                        <div class="col-md-9" >
                        <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                        <span class="badge badge-dark">Public Gists: ${user.public_gists}</span>
                        <span class="badge badge-success">Followers: ${user.followers}</span>
                        <span class="badge badge-danger">Followings: ${user.following}</span>

                        <ul class="list-group mt-3">
                        <li class="list-group-item ">Company: ${user.company}</li>
                        <li class="list-group-item ">Website/Blog: ${user.blog}</li>
                        <li class="list-group-item ">Location: ${user.location}</li>
                        <li class="list-group-item ">Member Since: ${user.created_at}</li>
                        </ul>
                        </div>


                    </div>
                </div>
            </div>
            <h3 class="page-heading mt-4">Latest Repos </h3>
                <div id="repos">
                </div>
            `)
        })
    })
})