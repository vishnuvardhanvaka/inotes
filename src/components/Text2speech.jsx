import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { API } from '../ApiClient'
import "./Scrollbar.css";
import { DownloadCloud, RefreshCw, Check } from 'lucide-react';
import { audio1, audio2 } from '../AudioData'

function Text2speech() {
    var Speakers = [
        'David', 'Callum', 'Charlie', 'Charlotte', 'Clyde', 'Daniel', 'Emma', 'Thomas'
    ]
    const languages = {
        'Arabic': 'ar',
        'Chinese (Simplified)': 'zh-cn',
        'Czech': 'cs',
        'Dutch': 'nl',
        'English': 'en',
        'French': 'fr',
        'German': 'de',
        'Hindi': 'hi',
        'Hungarian': 'hu',
        'Italian': 'it',
        'Japanese': 'ja',
        'Korean': 'ko',
        'Polish': 'pl',
        'Portuguese': 'pt',
        'Russian': 'ru',
        'Spanish': 'es',
        'Turkish': 'tr',
    };

    var language_content = {
        'en': "In a quiet village, a curious cat named Whiskers discovered a magical key hidden in the ancient library. As Whiskers turned the key, a secret door appeared, leading to a world filled with talking animals and enchanted landscapes. From that day on, Whiskers became the beloved explorer of the mystical realm, sharing tales of wonder with the village children.",
        'es': "En un tranquilo pueblo, un gato curioso llamado Whiskers descubrió una llave mágica escondida en la antigua biblioteca. Cuando Whiskers giró la llave, apareció una puerta secreta que conducía a un mundo lleno de animales parlantes y paisajes encantados. Desde ese día, Whiskers se convirtió en el amado explorador del reino místico, compartiendo cuentos de maravillas con los niños del pueblo.",
        'fr': "Dans un village paisible, un chat curieux nommé Whiskers découvrit une clé magique cachée dans l'ancienne bibliothèque. En tournant la clé, une porte secrète apparut, menant à un monde rempli d'animaux parlants et de paysages enchantés. Dès ce jour, Whiskers devint l'explorateur bien-aimé du royaume mystique, partageant des contes de merveilles avec les enfants du village.",
        'de': "In einem ruhigen Dorf entdeckte eine neugierige Katze namens Whiskers einen magischen Schlüssel, der in der alten Bibliothek versteckt war. Als Whiskers den Schlüssel drehte, erschien eine geheime Tür, die zu einer Welt führte, die mit sprechenden Tieren und verzauberten Landschaften gefüllt war. Von diesem Tag an wurde Whiskers der geliebte Entdecker des mystischen Reiches und teilte den Dorfkindern Geschichten voller Wunder mit.",
        'it': "In un tranquillo villaggio, un gatto curioso di nome Whiskers scoprì una chiave magica nascosta nell'antica biblioteca. Quando Whiskers girò la chiave, apparve una porta segreta, conducendo a un mondo pieno di animali parlanti e paesaggi incantati. Da quel giorno in poi, Whiskers divenne l'esploratore amato del regno mistico, condividendo racconti di meraviglie con i bambini del villaggio.",
        'pt': "Numa aldeia tranquila, um gato curioso chamado Whiskers descobriu uma chave mágica escondida na biblioteca antiga. Ao girar a chave, uma porta secreta apareceu, levando a um mundo cheio de animais falantes e paisagens encantadas. A partir desse dia, Whiskers tornou-se o explorador querido do reino místico, compartilhando contos de maravilhas com as crianças da aldeia.",
        'pl': "W cichej wiosce ciekawy kot o imieniu Whiskers odkrył magiczny klucz ukryty w starożytnej bibliotece. Kiedy Whiskers obrócił klucz, ukazała się tajna drzwi, prowadząca do świata pełnego rozmawiających zwierząt i oczarowanych krajobrazów. Od tego dnia Whiskers stał się ukochanym odkrywcą tajemniczego królestwa, dzieląc się opowieściami o cudach z dziećmi wioski.",
        'tr': "Sakin bir köyde, Meraklı adlı bir kedi adlı Whiskers adlı bir kedi, antik kütüphanede gizli bir sihirli anahtar buldu. Whiskers anahtarı çevirdiğinde, bir gizli kapı ortaya çıktı ve konuşan hayvanlarla dolu bir dünyaya, büyül manzaralara yol açtı. O günden sonra Whiskers, mistik krallığın sevgili kaşifi oldu ve köy çocuklarıyla harika masallarını paylaştı.",
        'ru': "В тихой деревне любознательный кот по имени Whiskers обнаружил волшебный ключ, спрятанный в древней библиотеке. Когда Whiskers повернул ключ, появилась секретная дверь, ведущая в мир, наполненный разговаривающими животными и волшебными пейзажами. С того дня Whiskers стал возлюбленным исследователем мистического царства, делясь чудесными историями с детьми деревни.",
        'nl': "In een rustig dorp ontdekte een nieuwsgierige kat genaamd Whiskers een magische sleutel die verborgen lag in de oude bibliotheek. Toen Whiskers de sleutel omdraaide, verscheen er een geheime deur die leidde naar een wereld vol pratende dieren en betoverende landschappen. Vanaf die dag werd Whiskers de geliefde ontdekkingsreiziger van het mystieke rijk, die wonderverhalen deelde met de kinderen van het dorp.",
        'cs': "Ve tiché vesnici zvědavá kočka jménem Whiskers objevila kouzelný klíč ukrytý v staré knihovně. Když Whiskers otočil klíčem, objevila se tajná dveře, vedoucí do světa plného mluvících zvířat a kouzelných krajinek. Od té doby se Whiskers stal milovaným objevitelem mystické říše, sdílejícím příběhy úžasu s dětmi ve vesnici.",
        'ar': "في قرية هادئة، اكتشفت قطة فضولية تدعى ويسكرز مفتاحًا سحريًا مخبأً في المكتبة القديمة. وبينما كانت ويسكرز تدير المفتاح، ظهر باب سري، يؤدي إلى عالم مليء بالحيوانات التي تتكلم والمناظر الطبيعية المسحورة. من ذلك اليوم فصاعدًا، أصبحت ويسكرز المكتشف المحبوب في المملكة السحرية، حيث تشارك قصص الدهشة مع أطفال القرية.",
        'zh-cn': "在一个宁静的村庄，一只好奇的猫名叫Whiskers发现了藏在古老图书馆中的一把神奇的钥匙。当Whiskers转动钥匙时，一扇秘密门出现了，通向一个充满会说话的动物和魔法风景的世界。从那天起，Whiskers成为了神秘王国中备受喜爱的探险家，与村庄的孩子们分享奇妙的故事。",
        'hu': "Egy csendes faluban egy kíváncsi macska, Whiskers néven felfedezett egy varázslatos kulcsot egy ősi könyvtárban. Ahogy Whiskers megfordította a kulcsot, egy titkos ajtó jelent meg, amely egy világba vezetett, amely tele volt beszélő állatokkal és elbűvölő tájakkal. Attól a naptól kezdve Whiskers a mágikus birodalom szeretett felfedezője lett, csodálatos történeteket osztva meg a falu gyermekeivel.",
        'ko': "조용한 마을에서 호기심 많은 이름이 Whiskers인 고양이가 고대 도서관에 숨겨진 마법의 열쇠를 발견했습니다. Whiskers가 열쇠를 돌릴 때 비밀 문이 나타나, 말하는 동물과 마법 같은 풍경이 가득한 세계로 이끌렸습니다. 그 날 이후로 Whiskers는 신비로운 영역의 사랑받는 탐험가가 되어 그 마을 어린이들과 기이한 이야기를 공유하게 되었습니다.",
        'ja': "静かな村で、好奇心旺盛なWhiskersという名前の猫が古代の図書館で隠れていた魔法の鍵を見つけました。 Whiskersが鍵を回すと、秘密の扉が現れ、話す動物と魔法に満ちた風景の世界に続いていました。その日以来、Whiskersは神秘の領域の愛される冒険者となり、村の子供たちと驚きの物語を共有しています。",
        'hi': "एक शांत गाँव में, एक जिज्ञासु बिल्कुल नामक एक उत्साही बिल्कुल नामक बिल्कुल एक जादुई चाबी का पता लगाया, जो प्राचीन पुस्तकालय में छिपी थी। जब बिल्कुल्स ने चाबी को पलटा, एक गुप्त दरवाजा प्रकट हुआ, जो बोलने वाले जानवरों और आश्चर्यजनक दृश्यों से भरा हुआ एक दुनिया में ले जाता है। उस दिन के बाद से, बिल्कुल्स ने ऐसा रहस्यमय क्षेत्र का प्रिय खोजी बन गया, जो गाँव के बच्चों के साथ आश्चर्य की कहानियों को साझा करता है।"
    };



    const [copied, setCopied] = useState(false)
    const [content, setContent] = useState('')
    const user_folder = localStorage.getItem('user_folder')
    const [speaker, setSpeaker] = useState('David')
    const [targetLanguage, setTargetLanguage] = useState('none')
    const [soruceLanguage, setSourceLanguage] = useState('en')
    const [error, setError] = useState(false)
    const [spin, setSpin] = useState(false)

    const [audioData, setAudioData] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    function playAudio() {
        audioRef.current.play();

    }
    useEffect(() => {
        if (audioData) {
            playAudio()
        }
    }, [audioData])

    var Sound = (function () {
        var df = document.createDocumentFragment();
        return function Sound(src) {
            var snd = new Audio(src);
            df.appendChild(snd);
            snd.addEventListener('ended', function () { df.removeChild(snd); });
            snd.play();
            return snd;
        }
    }());

    const base64ToBlob = (base64_data) => {
        const byteCharacters = atob(base64_data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: 'audio/wav' });
    };
    const download_audio = (base64_data) => {
        if (audioData) {
            const blob = base64ToBlob(base64_data);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `inotes ${speaker}-${soruceLanguage} voice`;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }

    }

    const togglePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };


    async function text2speech() {
        const URL = API + "getText2speech/";
        const form = new FormData();

        form.append('content', content)
        form.append('user_folder', user_folder)
        form.append('speaker', speaker)
        form.append('target_language', targetLanguage)
        form.append('source_language', soruceLanguage)

        // setAudioData(audio2)
        try {
            const formResponse = await axios.post(URL, form);
            if (formResponse.status === 200) {
                const formData = formResponse.data;
                // var snd = Sound("data:audio/wav;base64," + formData.audio_data);
                setAudioData(formData.audio_data);

                // togglePlay();
                setSpin(false)
                // playAudio()
            }

        } catch (error) {
            setSpin(false)
            setError(true)
            console.error('Error: *******', error, typeof (error));
        }
    }


    return (
        <div className=' w-full h-full flex flex-col items-center'>
            <div className='text-center m-1 text-3xl items-center justify-center'>
                Text to Speech
            </div>
            <div className='w-[80%]'>
                <textarea
                    id="scrollbar-textArea"
                    placeholder="iNOTES lets you voice any length of text in top quality, all while automatically matching what is being said with how it’s being said. The model works best on longer texts, so type in at least a few sentences."
                    value={content}
                    onChange={(e) => { setContent(e.target.value); }}
                    // className="font-serif text-lg bg-transparent p-0 resize-none w-full outline-none focus:ring-0 ring-0 border-none placeholder:text-gray-200"
                    className="block font-normal mt-2 w-full text-lg font-mono bg-transparent resize-none outline-none ring-0 border-none placeholder:text-gray-200 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white p-5 h-48 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">

                </textarea>
            </div>

            <div className='flex  items-center justify-evenly w-full mt-10 '>
                <div>
                    <select
                        // className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        name='speaker'
                        // className='cursor-pointer w-15 px-10 border-2'
                        // className=" font-Hyperlegible,serif cursor-pointer w-15 px-10 border-2 flex items-center p-3 text-sm text-black capitalize transition-colors duration-300 transform "
                        className='block cursor-pointer w-15 px-10 py-2 border-2 font-serif text-sm font-normal text-gray-700 truncate'
                        id="scrollbar-chat"
                        onChange={(e) => { setSpeaker(e.target.value); }}
                    >
                        <Check className='text-green-600 h-5' />
                        <option
                            className="text-gray-500"
                            value="" disabled selected={false}>
                            Speaker
                        </option>

                        {Speakers.map((speaker, index) => (
                            <option
                                className="text-gray-800 hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                                selected={speaker === 'David' ? true : false}
                                key={index} value={speaker}>
                                {speaker}
                            </option>
                        ))}
                    </select>
                </div>


                <button
                    onClick={(e) => { text2speech(e); setSpin(true); setError(false); }}
                    className=" flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">

                    <RefreshCw className={`h-[30px] w-[30px] ${spin ? "animate-spin" : ""}`} />
                    <span class="mx-1">Speak</span>
                </button>

                <div>
                    <select
                        // className="my-4 flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                        name='language'

                        // className='cursor-pointer w-15 px-10 border-2'
                        // className=" font-Hyperlegible,serif cursor-pointer w-15 px-10 border-2 flex items-center p-3 text-sm text-black capitalize transition-colors duration-300 transform "
                        className='overflow-y-auto block cursor-pointer w-15 px-10 py-2 border-2 font-serif text-sm font-normal text-gray-700 truncate'
                        id="scrollbar-chat"
                        onChange={(e) => {
                            setSourceLanguage(e.target.value);
                            setContent(language_content[e.target.value]);
                        }}

                    >
                        <option
                            className="text-gray-500"
                            value="" disabled selected={false}>
                            Source Language
                        </option>
                        {Object.keys(languages).map((languageName, index) => (
                            <option 
                            selected={languageName==='English'}
                            key={index} 
                            value={languages[languageName]}
                            >
                                {languageName}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className='w-full mt-10  relative  items-center justify-center  flex'>

                <audio
                    ref={audioRef}
                    controls
                    className='m-4 '
                    src={`data:audio/wav;base64,${audioData}`} type="audio/wav" >

                    </audio>
                <div
                    className={` ${audioData ? 'cursor-pointer hover:bg-gray-300' : ''} rounded-[100%] m-4 p-2`}
                    onClick={(e) => { download_audio(audioData) }}
                >
                    <DownloadCloud
                        className={` ${audioData ? 'text-gray-700' : 'text-gray-400'} rounded-[100%]`}
                    />
                </div>
            </div>

        </div>
    )
}
export default Text2speech;
