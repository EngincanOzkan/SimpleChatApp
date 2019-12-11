$(function(){
    var socket = io.connect("http://localhost:3000")

    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var messages_display = $("#messages_display") //gelen mesajların kullanıcı

    //Emit message -> mesajı sokete yollar 
    send_message.click(function(){
        /*
        * <button id="send_message" ...> butonuna tıklandığı zaman
        * new_message olarak isimlendirilen bir operasyon yolluyor
        * içeriside gönderilen (data) veri message verisidir
        * message.val(), <input id="message" ...> text objesinin değerini alır
        */
        socket.emit('new_message', {message : message.val()})
    })

    //listen on new_message -> soketi dinleyerek sunucuya soket üzerinden yollanan mesajarı okumak
    socket.on("new_message", (data) => { //data soket ile gelen veri
        /*
        * Bu satırda message_display adını verdiğimiz alanın(<section>) içe <p> html tagi ile paragraf olarak 
        * mesajımızı yazıyoruz
        * örnek: 
        * <section id="message_display">
        * ...
        * <p class='message'>
        * ...
        * </section>
        */
       messages_display.append("<p class='message'>" + data.username + ": " + data.message + "</p>") 
    })

    //Emit a username -> kullanıcı adını sokete yollar
    send_username.click(function(){
        /*
        * <button id="change_username" ...> butonuna tıklandığı zaman
        * change_username olarak isimlendirilen bir operasyon yolluyor
        * içeriside gönderilen (data) veri username verisidir
        * username.val(), <input id="username" ...> text objesinin değerini alır
        */
        socket.emit('change_username', {username : username.val()})
    })
});