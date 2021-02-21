export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'QJJzJP8uDneoPOM5ofojtMx7icm2',
      username: 'warrenmfg',
      fullName: 'Kent Warren',
      emailAddress: 'warrenmfg@icloud.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['QJJzJP8uDneoPOM5ofojtMx7icm2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['QJJzJP8uDneoPOM5ofojtMx7icm2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['QJJzJP8uDneoPOM5ofojtMx7icm2'],
      dateCreated: Date.now()
    }
  ];

  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: getCaption(i - 1),
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: getComment1(i - 1)
          },
          {
            displayName: 'orwell',
            comment: getComment2(i - 1)
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}

function getCaption(i) {
  const captions = [
    'A long time ago, things were different',
    'Where did I park?',
    "Weird looking dog, don't you think?",
    'Bet I could throw a football over that',
    'On a little walkabout'
  ];

  return captions[i];
}

function getComment1(i) {
  const comments = [
    'What do you feed that thing?',
    'Nice shot!',
    'You found Bambi!',
    'Looks cold--drink some hot chocolate for me',
    "Hey I've been there! The monkeys are loud!"
  ];

  return comments[i];
}

function getComment2(i) {
  const comments = [
    "Well that's a horse of a different color",
    "Where are you? That's beautiful",
    'Watch out for ticks!',
    'Catch any cool fish?',
    'Neato! Make sure you stretch!'
  ];

  return comments[i];
}
