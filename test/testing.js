const { expect } = require('chai');
var chai = require('chai');
var httpclient = require('chai-http');

chai.use(httpclient);

describe('Comunicación con la base de datos', function() {
    
    it('Agregar canción', function(done){
        chai.request('https://karaokeapi.josevenegasv.com').post('/karaoke/createSong').send({
            "id":"Fuentes de Ortiz&Ed Maverick",
            "songName":"Fuentes de Ortiz",
            "songAuthor":"Ed Maverick",
            "songAlbum":"Mix Pa Llorar en Tu Cuarto",
            "creationAuthor":"angelortizv",
            "creationDate":"09/08/2021",
            "modificationAuthor":"",
            "modificationDate":"",
            "songMp3":"https://res.cloudinary.com/dek4evg4t/video/upload/v1631768309/karaoke-app/Ed_Maverick_-_Fuentes_de_Ort%C3%ADz_Lyrics.mp4",
            "songLRC":"[re:https://seinopsys.dev/lrc - SeinopSys' LRC Editor]\n[ve:21ba523]\n[length: 3:24]\n[00:18.01]Ya dime si quieres estar conmigo o si mejor me voy\n[00:27.40]Tus besos dicen que tú sí me quieres pero tus palabras no\n[00:36.58]Y al chile yo hasta moriría por ti pero dices que no\n[00:45.37]No eres directa neta ya me estás cansando se concreta por favor\n[00:54.57]Y en la noche que las estrellas hablen yo pienso en ti mi amor\n[01:03.74]Que me hiciste, de mi cabeza no sales\n[01:08.03][02:21.07]Y no lo digo por mamón\n[01:11.20]Si me dices para ti que soy, no dudaré en hacerte tan feliz\n[01:18.20]Eres tan especial para mí\n[01:20.48][02:33.65]Dime por qué me haces sufrir\n[01:23.86][02:37.42]Yo te olvidaré desde las Fuentes de Ortiz\n[01:30.37]Soy inseguro cuando dices que me quieres porque creo que no\n[01:40.20]Como bebé caigo pero sí redondito en tu trampa amor\n[01:48.90]Ya dime si tú me quieres por favor\n[01:58.66]Y he sufrido y me he empedado tanto por tu amor\n[02:07.30]Y en la noche en que las estrellas salen\n[02:12.07]Yo pienso en ti mi amor\n[02:16.86]Qué me hiciste, de mi cabeza no sales\n[02:24.46]Si me dices para ti quién soy\n[02:28.34]No durare en hacerte tan feliz, eres especial para mí\n",
            "songCover":"https://i1.sndcdn.com/artworks-000638802973-7m5syv-t500x500.jpg"
        }).end((err, res) => {
            //expect(res).to.have.status(200);
            chai.assert.equal(res.text, 'Cancion creada');
            chai.assert.equal(res.status, 200);
            done();
        });
    });
    
    it('Buscar canción', function(done){
        chai.request('https://karaokeapi.josevenegasv.com').get('/karaoke/getSong/{"songName":"Fuentes de Ortiz","songAuthor":"Ed Maverick" }')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });

    it('Buscar canción por letra', function(done){
        chai.request('https://karaokeapi.josevenegasv.com').get('/karaoke/search/{"category":"songLRC","filter":"Ya dime si quieres estar conmigo o si mejor me voy" }')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });


    it('Modificar canción', function(done){
        chai.request('https://karaokeapi.josevenegasv.com').put('/karaoke/updateSong/{ "songName":"Fuentes de Ortiz", "songAuthor":"Ed Maverick"}').send({"modificationAuthor":"Momboñombo Moñagallo"})
        .end((err, res) => {
            chai.assert.equal(res.text, 'Cancion modificada correctamente');
            expect(res).to.have.status(200);
            done();
        });
    });
    
    it('Borrar canción', function(done){
        chai.request('https://karaokeapi.josevenegasv.com').delete('/karaoke/deleteSong/{"songName":"Fuentes de Ortiz", "songAuthor":"Ed Maverick"}')
        .end((err, res) => {
            chai.assert.equal(res.text, 'Cancion eliminada correctamente');
            expect(res).to.have.status(200);
            done();
        });
    });
    
});