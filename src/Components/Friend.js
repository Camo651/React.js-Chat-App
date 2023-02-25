import React from 'react';

let apiUrl = 'https://api.projectnodenium.com/ChatApp/user.php';

export default function Friend({uuid, changeDm}) {

  const [name, setName] = React.useState('Loading...');
  React.useEffect(() => {
    getName();
  }, []);

  function getName(){
    fetch(apiUrl,{
        method: 'POST',
        body: JSON.stringify({
            token : 's16ond26',
            action : 'g',
            uuid : uuid,
            payload : {}
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.status === 'SUCCESS'){
            let user = data.payload;
            console.log(user.name);
            setName(user.name);
        }else{
            alert('Data Error: ' + data.status);
        }
    })
    .catch((error) => {
        alert('Return Error: ' + error);
    }
    );
  }

  function _changeDm(){
    changeDm(uuid);
  }

  return (
    <>
      <div className="friend">
        <button onClick={_changeDm}>{name}</button>
      </div>
    </>
  )
}
