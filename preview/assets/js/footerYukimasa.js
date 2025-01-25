"use strict";
/**
 * ユキマサくんの画像と言葉
 */
function footerYukimasa() {
    const imgDom = document.querySelector(".footer-message-img");
    const msgDom = document.querySelector(".footer-message-text");
    if (!(imgDom && msgDom)) return;
    
    const data = {
        days: ["日", "月", "火", "水", "木", "金", "土"],
        hours: ["おはようございます。", "こんにちは。", "こんばんは。"],
        msgs: [["好きな音楽や本と一緒に、心を落ち着ける時間を作りましょう。", "日曜日は自分を甘やかす日！好きなことをしてリラックス。", "家族や友人との時間を大切に。幸せな日曜日を！", "新しい週に備えて、しっかり充電しましょう。"], ["新しい週のスタート！元気よくいきましょう！", "月曜日は新しい挑戦のチャンスです。", "週のはじめに良い習慣を取り入れてみましょう！", "リフレッシュした気持ちでスタートダッシュ！"], ["月曜を乗り越えたあなたに拍手！今日も着実に。", "スムーズな一日を目指して、リズムをつかみましょう！", "計画的に進めて、余裕を作りましょう。", "火曜日も明るい気持ちで進みましょう！"], ["週の折り返し地点！ひと息ついてリフレッシュ。", "小さな楽しみを見つけて、エネルギーを補充しましょう。", "焦らず、一歩ずつ。週末はすぐそこです！", "水曜は自分をいたわる日。ゆっくり過ごす時間も大切に。"], ["週末が近づいてきました！もうひと踏ん張り！", "一週間の成果を振り返りながら、ペースを保ちましょう。", "仕事も生活も、バランスが大事！深呼吸して続けましょう。", "週の後半戦！体調管理も忘れずに。"], ["あと少しで週末！最後の力を発揮しましょう！", "今週の締めくくりに、ベストを尽くしましょう。", "気を抜かず、丁寧に仕上げて素敵な週末を迎えましょう！", "金曜日はポジティブに。良い気分で締めくくりましょう！"], ["お疲れさまでした！リラックスして楽しい一日を。", "休日だからこそ、自分の時間をたっぷり使いましょう。", "好きなことをして、心を満たす一日にしましょう。", "体を動かしてリフレッシュするのも良いですね！"]]};
    const date = new Date();
    const monthNum = date.getMonth(),
        dayNum = date.getDay(),
        hourNum = date.getHours();
    imgDom.src = `/yukimasa/${monthNum + 1}.webp`;
    const hello = (hourNum < 4)?data.hours[2] : (hourNum < 11)?data.hours[0] : (hourNum < 17)?data.hours[1] : data.hours[2];
    const day = data.days[dayNum];
    const msg = data.msgs[dayNum][(Math.random()*data.msgs[dayNum].length)|0];
    msgDom.textContent = `${hello} 今日は${day}曜日です。 ${msg}`;
}
export {footerYukimasa};