$(document).ready(function(){
    var getAndDisplayAllTasks = function () {
      $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1',
        dataType: 'json',
        success: function (response, textStatus) {
            $('#todo-list').empty(); // Add this line

            response.tasks.forEach(function (task) {
                $('#todo-list').append('<div class="row p-2 justify-content-center border border-secondary-subtle"><h1 class="col-4">' + task.content + '</h1><button class="delete col-2 btn btn-danger" data-id="' + task.id + '">Delete</button><input type="checkbox" class="mark-complete col-2" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
              });
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });
    }
    
    var createTask = function () {
      $.ajax({
        type: 'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          task: {
            content: $('#new-task-content').val()
          }
        }),
        success: function (response, textStatus) {
            $('#new-task-content').val(''); // Add this line

          getAndDisplayAllTasks();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      });  
    }
    
    $('#create-task').on('submit', function (e) {
      e.preventDefault();
      createTask();
    });

    var deleteTask = function (id) {
        $.ajax({
       type: 'DELETE',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

      $(document).on('click', '.delete', function () {
        deleteTask($(this).data('id'));
      });

      var markTaskComplete = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_complete?api_key=2',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }
      $(document).on('change', '.mark-complete', function () {
        if (this.checked) {
           markTaskComplete($(this).data('id'));
         } else {
           markTaskActive($(this).data('id'));
         }
       });

       var markTaskActive = function (id) {
        $.ajax({
       type: 'PUT',
          url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '/mark_active?api_key=2',
          dataType: 'json',
          success: function (response, textStatus) {
            getAndDisplayAllTasks();
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });
      }

    getAndDisplayAllTasks();
    
  });