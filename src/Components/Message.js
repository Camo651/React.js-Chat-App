import React from 'react'

export default function Message() {
  return (
    <>
      <div className="message">
        <div className="message-header">
          <img src="https://via.placeholder.com/50" alt="avatar" />
          <div className="message-header-info">
            <h3>Friend's Name</h3><p>10:00 AM</p>
          </div>
        </div>
        <div className="message-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl eu nisl. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, nec aliquam nisl nisl eu nisl.</p>
        </div>
      </div>
    </>
  )
}
