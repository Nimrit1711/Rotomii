// escape html stuff for security
function escapeHtml(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// load users when page loads
window.onload = function() {
    loadUsers();
};

function loadUsers() {
    const usersList = document.getElementById('users-list');
    
    fetch('/users/non-admin')
        .then(response => response.json())
        .then(users => {
            if (users.length == 0) {
                usersList.innerHTML = '<p>No users to display</p>';
                return;
            }
            
            let html = '';
            for (let i = 0; i < users.length; i++) {
                const user = users[i];
                const date = new Date(user.created_at);
                
                html += '<div class="user-item" data-user-id="' + user.user_id + '">';
                html += '<div class="user-info">';
                html += '<strong>' + escapeHtml(user.username) + '</strong>';
                html += '<span>' + escapeHtml(user.email) + '</span>';
                html += '<span>Joined: ' + date.toLocaleDateString() + '</span>';
                html += '</div>';
                html += '<button class="delete-user-btn" onclick="deleteUser(' + user.user_id + ', \'' + escapeHtml(user.username) + '\')">';
                html += 'Delete User';
                html += '</button>';
                html += '</div>';
            }
            
            usersList.innerHTML = html;
        })
        .catch(error => {
            console.log('Error: ' + error);
            usersList.innerHTML = '<p>Failed to load users</p>';
        });
}

// delete a user
function deleteUser(userId, username) {
    if (!confirm('Delete user ' + username + '?')) {
        return;
    }
    
    // disable button while deleting
    const btn = document.querySelector('[data-user-id="' + userId + '"] .delete-user-btn');
    btn.disabled = true;
    btn.textContent = 'Deleting...';
    
    fetch('/users/' + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // remove from page
            const userDiv = document.querySelector('[data-user-id="' + userId + '"]');
            userDiv.remove();
            
            // check if any users left
            const usersLeft = document.querySelectorAll('.user-item');
            if (usersLeft.length == 0) {
                document.getElementById('users-list').innerHTML = '<p>No users to display</p>';
            }
        } else {
            throw new Error('Delete failed');
        }
    })
    .catch(error => {
        alert('Could not delete user');
        console.log(error);
        // reset button
        btn.disabled = false;
        btn.textContent = 'Delete User';
    });
}
