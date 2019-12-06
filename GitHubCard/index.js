/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cards = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/jeffrey1200")
  .then(response => {
    // console.log(response.data)
    // console.log(response.data);
    userCard(response.data);
  })
  .catch(error => {
    // console.log(error);
  });

axios.get("https://api.github.com/users/jeffrey1200/followers")
.then(res => {
  // console.log(res.data)

  res.data.forEach(item => {
    console.log(item)
    let loginInfo = item.login;
    let https = "https://api.github.com/users/" + loginInfo;
    axios.get(https).then(result => {
      // console.log(result.data);
      userCard(result.data);
    });
  });
});

function userCard(data) {
  const bigDiv = document.createElement("div");
  const userImg = document.createElement("img");
  const cardInfo = document.createElement("div");
  const nameHead = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const aHref = document.createElement("a");
  const followersCount = document.createElement("p");
  const followingCount = document.createElement("p");
  const biography = document.createElement("p");
  //class list add
  bigDiv.classList.add("card");
  cardInfo.classList.add("card-info");
  nameHead.classList.add("name");
  userName.classList.add("username");
  //append
  bigDiv.appendChild(userImg);
  bigDiv.appendChild(cardInfo);
  cardInfo.appendChild(nameHead);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  profile.appendChild(aHref);
  cardInfo.appendChild(followersCount);
  cardInfo.appendChild(followingCount);
  cardInfo.appendChild(biography);

  userImg.setAttribute("src", data.avatar_url);
  nameHead.textContent = data.name;
  userName.textContent = data.login;
  location.textContent = `Location: ${data.location}`;
  aHref.setAttribute("href", data.html_url);
  aHref.textContent = `Github: Check their profile`;
  followersCount.textContent = `Followers: ${data.followers}`;
  followingCount.textContent = `Followings: ${data.following}`;
  biography.textContent = `Biography: ${data.bio}`;

  cards.appendChild(bigDiv);

  return bigDiv;
}



/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

/* From Alexander Sierra to Everyone:  04:33 PM
axios.get("https://api.github.com/users/alexandercsierra/followers")
  .then(obj => {
    let otherfollowersArray = obj.data;
    return otherfollowersArray;})
  
  .then(
    arr => arr.map(user => {
      let profileURL = "https://api.github.com/users/" + user.login;
      axios.get(profileURL)
      .then(response => {
        let container = document.querySelector(".cards");
        container.appendChild(createCard(response.data));
      })
    })
    
  )
  .catch(error => console.log(error))
From Christopher Oakes to Everyone:  04:39 PM
let dustinArray = []
//console.log(dustinArray)
//console.log(dustinArray.length)

axios.get('https://api.github.com/users/dustinmyers/followers')
  .then(response => {
    // console.log(response)
    // const dustin = response.data[1].login
    //console.log(dustin)
    for (let i = 0; i < response.data.length; i++) {
      dustinArray.push(response.data[i].login)
    }
    dustinArray.forEach((item) => {
      axios.get(`https://api.github.com/users/${item}`)
        .then(response => {
          const myInfo = response.data
          cards.appendChild(cardMaker(myInfo))
          //console.log(item)
        })
    })
  })
*/
