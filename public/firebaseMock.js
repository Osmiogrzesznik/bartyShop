var fdb = {
    "orders": {
        "a1a1": {
            "__comment": "order id is the order number and pseudo user id",
            "items": {
                "p1p1": { // id prod
                    "o1": true, // id opcji jesli zostala zaznaczona
                }
            },
            "client": {
                "name": "examplian",
                "surname": "examplski",
                "deliveryAddress": {
                    "mieszkanie": 10,
                    "brama": 10,
                    "ulica": "bubu avenue"
                },
                "billingAddress": {
                    "mieszkanie": 10,
                    "brama": 10,
                    "ulica": "bubu avenue"
                }
            }
        }
    },
    "products": {
        "p1p1": {
            "name": "Szczotka",
            "description": "Szczotka do toalet typu TUBA wykonana została ze stali szlachetnej malowanej proszkowo w kolorze czarnym. Wyposażona w praktyczny uchwyt z przykryciem. Dodatkowo zawiera wyjmowany plastikowy pojemnik, który pozwala na utrzymanie czystości i prawidłowej higieny. Szczotka wraz z pojemnikiem jest trwała i estetyczna. Świetnie pasuje z pozostałym wyposażeniem higienicznym toalety w kolorze czarnym. ",
            "cost": 599,
            "onStock": 1,
            "opcje": {
                "o1": {
                    "aktywna": false,
                    "name": "opcja 1",
                    "img": {
                        "a1": "images/szczotka1.png"
                    },
                    "description": "dodatkowy domestos, ulatwia czyszczenie",
                    "cost": 599,
                    "onStock": 4, // TODO musi byc osobny node dla ilosci z pozwoleniem read/write albo zmienia sie tylko gdy bartek potwierdza order
                },
                "o2": {
                    "aktywna": false,
                    "name": "opcja 2",
                    "img": {
                        "a1": "images/szczotka1.png"
                    },
                    "description": "dodatkowy domestos, ulatwia czyszczenie",
                    "cost": 599,
                    "onStock": 4, // TODO musi byc osobny node dla ilosci z pozwoleniem read/write albo zmienia sie tylko gdy bartek potwierdza order
                }

            },
            "img": {
                "a1a1a1a1": "images/szczotka1.png",
                "a2a2a2a2": "images/szczotka2.jpg"
            },
            "linkToVideo": "https://www.youtube.com/watch?v=4N5eCg6YAZk"
        },
        "p2p2": {
            "name": "Suszarka",
            "onStock": 2,
            "description": "suszarka suszy . suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy ",
            "cost": 2099,
            "img": {
                "a1a1": "images/suszarka1.jpg",
                "a2a2": "images/suszarka2.jpg",
                "a3a3": "images/suszarka3.jpg"
            },
            "linkToVideo": "https://www.youtube.com/watch?v=SQoe8lpyGLs"
        },
        "p3p3": {
            "name": "Opona",
            "onStock": 4,
            "description": "suszarka suszy . suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy suszarka suszy ",
            "cost": 1999,
            "img": {
                "a1a1": "images/kolo1.jpg",
                "a2a2": "images/kolo2.jpg"
            },
            "linkToVideo": "https://www.youtube.com/watch?v=wRL3BrUE08Q"
        }
    }
}


function Ref(ob, lastkey = "__None__") {
    this.ob = ob
    this.lastkey = lastkey
    this.child = (k) => {
        return new Ref(this.ob[k], k)
    }
    this.set = (nV) => {
        this.ob[this.lastkey] = nV
        return new Promise((res, rej) => {

            console.log(`signing in to promise success`)
            res(122)
        });
    }
    this.on = (typ, callback) => {
        snap = {
            val_: this.ob,
            val() {
                return Object.assign({}, this.val_)
            }
        }
        // typ na razie jest niewazny 
        callback(snap)
    };


}


window.firebaseMock = {
    auth() {
        return this.fakeauth;
    },
    database() {
        return this.fakedb;
    },
    fakedb: {
        ref() {
            return new Ref(fdb);
        }
    },
    fakeauth: {
        signInWithEmailAndPassword(em, pas) {
            return new Promise((res, rej) => {

                console.log(`signing in to promise success`)
                setTimeout(() => {
                    res("promise resolved OK");
                }, 1000);
            })
        },
        onAuthStateChanged() {
            return new Promise((res, rej) => {

                console.log(`signing in to promise success`)
                let user = {
                    uid: "This_supposedToBeRandomUid"

                }
                setTimeout(() => {
                    res("promise resolved OK");
                }, 1000);
            });
        }
    }
};

// p = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([1, 2, 3]);
//     }, 1000);
// });

// promise.then(vlaues => {
//     console.log(values[1]);
// });

// .auth().signInWithEmailAndPassword(this.em, this.pass).then((authsucc) => {
//     console.log(user);
//     this.err = "OK";
//     this.uid = authsucc.user.uid;
//     this.loggedin = true;

// }).catch(error => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // ...

//     this.err = error.code + errorMessage;
//     this.alert2(this.err);
// });