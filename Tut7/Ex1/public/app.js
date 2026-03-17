(function () {
  var content = document.getElementById('content');
  var messageEl = document.getElementById('message');

  function showMessage(msg) {
    messageEl.textContent = msg || '';
    messageEl.style.display = msg ? 'block' : 'none';
  }

  function api(path, options) {
    options = options || {};
    options.headers = options.headers || {};
    options.headers['x-api-key'] = '123456'; // API KEY

    if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(options.body);
    }

    return fetch(path, options).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok) throw new Error(data.message || 'Request failed');
        return data;
      });
    });
  }

  // LIST
  function renderStudentsList(data) {
    var students = data.students || [];
    var html = '<h1>Students</h1>';
    html += '<a href="#student/create">Add Student</a>';
    html += '<ul>';

    students.forEach(function (s) {
      html += '<li><a href="#student/' + s.id + '">' + escapeHtml(s.name) + '</a></li>';
    });

    html += '</ul>';
    content.innerHTML = html;
  }

  // SHOW
  function renderStudentShow(data) {
    var s = data.student;
    var html = '<h1>' + escapeHtml(s.name) + '</h1>';
    html += '<p>Age: ' + escapeHtml(s.age) + '</p>';
    html += '<p>Course: ' + escapeHtml(s.course) + '</p>';
    html += '<a href="#student/' + s.id + '/edit">Edit</a> | ';
    html += '<a href="#" id="deleteBtn">Delete</a>';

    content.innerHTML = html;

    document.getElementById('deleteBtn').addEventListener('click', function () {
      api('/student/' + s.id, { method: 'DELETE' })
        .then(function (r) {
          showMessage(r.message);
          location.hash = '#students';
        })
        .catch(function (err) { showMessage(err.message); });
    });
  }

  // CREATE
  function renderStudentCreate() {
    var html = '<h1>Add Student</h1>';
    html += '<form id="form">';
    html += '<input name="name" placeholder="Name"><br>';
    html += '<input name="age" placeholder="Age"><br>';
    html += '<input name="course" placeholder="Course"><br>';
    html += '<button type="submit">Create</button></form>';

    content.innerHTML = html;

    document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();

      var form = e.target;

      api('/student', {
        method: 'POST',
        body: {
          student: {
            name: form.name.value,
            age: form.age.value,
            course: form.course.value
          }
        }
      }).then(function (r) {
        showMessage(r.message);
        location.hash = '#students';
      }).catch(function (err) { showMessage(err.message); });
    });
  }

  // EDIT
  function renderStudentEdit(data) {
    var s = data.student;

    var html = '<h1>Edit Student</h1>';
    html += '<form id="form">';
    html += '<input name="name" value="' + escapeHtml(s.name) + '"><br>';
    html += '<input name="age" value="' + escapeHtml(s.age) + '"><br>';
    html += '<input name="course" value="' + escapeHtml(s.course) + '"><br>';
    html += '<button type="submit">Update</button></form>';

    content.innerHTML = html;

    document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();

      var form = e.target;

      api('/student/' + s.id, {
        method: 'PUT',
        body: {
          student: {
            name: form.name.value,
            age: form.age.value,
            course: form.course.value
          }
        }
      }).then(function (r) {
        showMessage(r.message);
        location.hash = '#student/' + s.id;
      }).catch(function (err) { showMessage(err.message); });
    });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function route() {
    var hash = (location.hash || '#students').slice(1);
    var parts = hash.split('/');
    showMessage('');

    if (parts[0] === 'students') {
      api('/students')
        .then(renderStudentsList)
        .catch(function (err) {
          content.innerHTML = '<p>' + escapeHtml(err.message) + '</p>';
        });
      return;
    }

    if (parts[0] === 'student') {
      if (parts[1] === 'create') {
        renderStudentCreate();
        return;
      }

      var studentId = parts[1];

      if (parts[2] === 'edit') {
        api('/student/' + studentId)
          .then(renderStudentEdit)
          .catch(function (err) {
            content.innerHTML = '<p>' + escapeHtml(err.message) + '</p>';
          });
      } else {
        api('/student/' + studentId)
          .then(renderStudentShow)
          .catch(function (err) {
            content.innerHTML = '<p>' + escapeHtml(err.message) + '</p>';
          });
      }
      return;
    }

    api('/students').then(renderStudentsList);
  }

  window.addEventListener('hashchange', route);
  route();
})();