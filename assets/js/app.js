const imageGlock = document.querySelector('.glock')
const chooseGun = document.querySelector('.choose-gun')
const qBtn = document.createElement('button')
qBtn.classList.add('qbtn')

imageGlock.addEventListener('click', function() {
    container.style.display = 'inline'
    chooseGun.style.display = 'none'
})

qBtn.addEventListener('click', function(){
    container.style.display = 'none'
    chooseGun.style.display = 'flex'
})

const container = document.createElement('div')
const reload = document.createElement('button')
const tir = document.createElement('button')
const img = document.createElement('img')
const tirText = document.createElement('p')
const body = document.querySelector('body')
const quality = document.createElement('p')
const repair = document.createElement('button')

const notif = document.querySelector('.notif')
const notifH1 = document.querySelector('.notif h1')
const notifP = document.querySelector('.notif p')

const compteurTirText = document.createElement('p')
const cheatMenu = document.querySelector('.cheat')

const goldCheat = document.querySelector('#camo-gold')
const platCheat = document.querySelector('#camo-plat')
const darkCheat = document.querySelector('#camo-dark-matter')
const infiniteAmmo = document.querySelector('#infinite-ammo')

const tirAudio = new Audio('assets/img/tir.mp3')
const reloadAudio = new Audio('assets/img/reload.mp3')

reload.textContent = 'Recharge ton arme'
tir.textContent = 'TIR !'
img.src = 'assets/img/glock.jpg'
quality.textContent = "100"
repair.textContent = 'Répare ton arme'
qBtn.textContent = 'Quitte la partie'

container.classList.add('container')

body.appendChild(container)
container.appendChild(reload)
container.appendChild(img)
container.appendChild(tir)
container.appendChild(tirText)
container.appendChild(compteurTirText)
container.appendChild(quality)
container.appendChild(repair)
container.appendChild(qBtn)

let compteurTir = 0
let compteurQuality = 100


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Glock() {
    let thisVr = this
    this.ammo = function () {
        this.ammo = 12
        tirText.textContent = '12'
        tir.addEventListener('click', function () {
            thisVr.ammo--
            console.log(thisVr.ammo)
            img.classList.toggle('tir')
            setTimeout(() => {
                img.classList.remove('tir')
            }, 100);
            tirText.textContent = thisVr.ammo
            if (thisVr.ammo === 0) {
                thisVr.ammo++
                tir.disabled = true
                notif.classList.add('la')
                setTimeout(() => {
                    notif.classList.remove('la')
                }, 3000);
            }
            tirAudio.play()

            compteurTir++
            compteurTirText.textContent = compteurTir
            console.log('compteurTir ' + compteurTir)
            if (compteurTir === 150) {
                img.src = 'assets/img/glock_gold.png'
            } else if (compteurTir === 300) {
                img.src = 'assets/img/glock_platine.png'
            } else if (compteurTir === 500) {
                img.src = 'assets/img/glock_darkmatter.png'
            }

            quality.textContent = compteurQuality
            console.log('qualité ' + compteurQuality)
            compteurQuality -= getRandomInt(5);
        })
    }
    this.load = function () {
        reload.addEventListener('click', function () {
            tirText.textContent = 12
            thisVr.ammo = 12
            tir.disabled = false
            reloadAudio.play()
        })
    }
    this.cheat = function () {
        goldCheat.addEventListener('click', function () {
            notifP.textContent = 'Le camo or se met...'
            notif.classList.add('la')
            setTimeout(() => {
                img.src = 'assets/img/glock_gold.png'
            }, 2500);
            setTimeout(() => {
                notif.classList.remove('la')
            }, 3000);
        })

        platCheat.addEventListener('click', function () {
            notifP.textContent = 'Le camo platine se met...'
            notif.classList.add('la')
            setTimeout(() => {
                img.src = 'assets/img/glock_platine.png'
            }, 2500);
            setTimeout(() => {
                notif.classList.remove('la')
            }, 3000);
        })

        darkCheat.addEventListener('click', function () {
            notifP.textContent = 'Le camo dark matter se met...'
            notif.classList.add('la')
            setTimeout(() => {
                img.src = 'assets/img/glock_darkmatter.png'
            }, 2500);
            setTimeout(() => {
                notif.classList.remove('la')
            }, 3000);
        })

        infiniteAmmo.addEventListener('click', function () {
            notifP.textContent = "L'infinite ammo s'active..."
            notif.classList.add('la')
            setTimeout(() => {
                if (tirText.style.display !== 'none') {
                    thisVr.ammo = 10000000000000000000
                    tirText.style.display = 'none'
                    compteurTirText.style.display = 'none'
                } else {
                    thisVr.ammo = 12
                    tirText.textContent = 12
                    compteurTirText.textContent = 0
                    compteurTir = 0
                    tirText.style.display = 'block'
                    compteurTirText.style.display = 'block'
                }
            }, 2500);
            setTimeout(() => {
                notif.classList.remove('la')
            }, 3000);
        })
    }
    this.repair = function () {
        repair.addEventListener('click', function () {
            compteurQuality += getRandomInt(5);
            quality.textContent = compteurQuality
            if (compteurQuality >= 100) {
                console.log('qualité max')
                quality.textContent = 'Qualité max !'
                compteurQuality = 100
            } else if (quality.textContent === '0' || compteurQuality <= 0) {
                alert('Ton arme est casser')
                window.reload()
            }
        })
    }
}

let glock = new Glock()
glock.load()
glock.ammo()
glock.cheat()
glock.repair()

function closeCheat() {
    cheatMenu.style.display = 'none'
}

function openCheat() {
    cheatMenu.style.display = 'inline'
}