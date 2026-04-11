function calculate() {
  let intake = Number(document.getElementById("intake").value);
  let exercise = Number(document.getElementById("exercise").value);
  let water = Number(document.getElementById("water").value);
  let sleep = Number(document.getElementById("sleep").value);
  let bonus = Number(document.getElementById("bonus").value);

  let total = intake + exercise + water + sleep + bonus;

  document.getElementById("result").innerText = "Score: " + total;

  showPopup(total);
  saveDay(total);
}

/* =========================
   POPUP
========================= */
function showPopup(score) {
  let popup = document.createElement("div");

  popup.innerText = "Score: " + score;

  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.background = "#2a2230";
  popup.style.color = "#f9a8d4";
  popup.style.padding = "12px 20px";
  popup.style.borderRadius = "12px";
  popup.style.border = "1px solid #a855f7";
  popup.style.boxShadow = "0 0 15px rgba(168,85,247,0.5)";
  popup.style.zIndex = "9999";

  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 1500);
}

/* =========================
   SAVE DATA
========================= */
function saveDay(score) {
  let today = new Date().toDateString();

  let data = JSON.parse(localStorage.getItem("history")) || {};

  data[today] = score;

  localStorage.setItem("history", JSON.stringify(data));

  updateStreak(data);
  renderHistory(data);
}

/* =========================
   HISTORY
========================= */
function renderHistory(data) {
  let container = document.getElementById("history");
  if (!container) return;

  container.innerHTML = "";

  let entries = Object.entries(data)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]));

  for (let [date, score] of entries) {
    let div = document.createElement("div");
    div.style.padding = "6px 0";
    div.style.borderBottom = "1px solid #3a2a40";
    div.innerHTML = `${date} → <b>${score} pts</b>`;
    container.appendChild(div);
  }
}

/* =========================
   STREAK
========================= */
function updateStreak(data) {
  let dates = Object.keys(data)
    .map(d => new Date(d))
    .sort((a, b) => b - a);

  let streak = 0;
  let today = new Date();

  for (let i = 0; i < dates.length; i++) {
    let diff = Math.floor((today - dates[i]) / (1000 * 60 * 60 * 24));

    if (diff === streak) {
      streak++;
    } else {
      break;
    }
  }

  localStorage.setItem("streak", streak);

  const streakEl = document.getElementById("streak");
  if (streakEl) streakEl.innerText = "🔥 Streak: " + streak;
}

/* =========================
   CONTENT
========================= */

const reasons = [
  "You will be FAT if you eat today, just put it off one more day.",
  "You don't NEED food.",
  "Fat people can't fit everywhere.",
  "Guys will be able to pick you up without struggling.",
  "You'll be able to run faster without all that extra weight holding you back.",
  "People will remember you as the beautiful thin one.",
  "If someone has to describe you, they'll say oh she weighs like 90, 100 lbs.",
  "Guys will want to get to know you, not laugh at you and walk away.",
  "Starving is an example of excellent willpower.",
  "You will be able to see your beautiful, beautiful bones.",
  "Bones are clean and pure. Fat is dirty and hangs on your bones like a parasite.",
  "If you eat then you'll look like those disgusting, fat, ghetto and trailer-trash hookers on Jerry Springer.",
  "The models that everyone claims are beautiful, the spitting image of perfection, are any of them fat? NO!",
  "Too many people in the world are obese.",
  "People who eat are selfish and unrealistic.",
  "Only fat people are attracted to fat people. Do you want pigs to like you because you are one of them.",
  "Anyone can have inner beauty but few can earn real beauty, inside as well as out.",
  "You'll be able to move as quietly and skillfully as a spider.",
  "Only thin people are graceful.",
  "If you slap a fat person you can see a shockwave ripple over their skin. That's disgusting.",
  "Do you want people to say for gods sake get off me you're crushing me!!! or you are sooo light ???",
  "Underweight aka perfect body.",
  "Ballerina? or beanbag?",
  "I want to be light enough so a helium balloon could lift me and carry me to the clouds.",
  "I want to walk in the snow and leave no footprints.",
  "Starve off the parts you don't need. They're ugly and they drag you down.",
  "Nothing cant be fixed with hunger and weight loss.",
  "Saying no thanks to food is saying yes please to THIN!!!",
  "Fat people are so huge, yet people look away from them as if they don't exist.",
  "The only time people do notice a fat person is when they get in the way of that beautiful thin girl walking by (ok that sounds really horrible i know.)",
  "Have you ever seen a person NOT notice a walking skeleton.",
  "Nothing tastes as good as thin feels.",
  "Is food more important that happiness in life? I think not!",
  "Eating is conforming to everyone else's expectations.",
  "When you start to get dizzy and weak you're almost there.",
  "Hunger is your friend and it won't betray you like food.",
  "Food is mean and sneaky. It tricks you into eating it and it works on you from the inside out making you fat, bloated, ugly and unhappy.",
  "Think of anorexia as your secret weapon.",
  "If you can name one reason to be fat, I'll name a million and one to be thin.",
  "Thin people look good in ANY kind of clothes.",
  "Food rots your teeth.",
  "Puffy cheeks, double chins and thick ankles-- aren't attractive.",
  "Fatty areas stretch and sag as you get older.",
  "Ever seen the arms of a fat person wave hello or goodbye?",
  "Eating little to nothing saves you money!",
  "The average (middle class) American wastes OVER $8,000 a year on FOOD ALONE...it goes in one end and out the other. That sure is a lot of fat! No wonder so many Americans are obese and overweight!",
  "Fat people make their country look bad.",
  "Big people sweat more and they smell bad.",
  "Fat people die earlier.",
  "You'll be the envy of all the other girls.",
  "All of the guys will want you.",
  "You're less likely to get food poisoning.",
  "You won't be exposed to all the chemicals and pesticides they put in food today.",
  "You won't get sweaty on hot days.",
  "The word fat will only apply to you in a sarcastic way.",
  "No one wants to see a fat person dance.",
  "Beauty Queen? or Dairy Queen?"
];

const motivationalQuotes = [
  "Perfection is reached, not when there is no longer anything to add, but when there is no longer anything to take away.",
  "Time spent wasting is not wasted time.",
  "Nothing tastes as good as thin feels.",
  "A moment on the lips, forever on the hips.",
  "Show up even when it’s boring.",
  "You can never be too rich or too thin.",
  "Hunger hurts but starving works.",
  "The flat stomach is nice, but a concave one is perfect.",
  "You will be tempted quite frequently. You will have to choose whether to enjoy yourself wholly for those 20 minutes or so that you will be consuming excess calories, or whether you will despise yourself cordially for the next three days.",
  "Eat to live, but don't live to eat.",
  "Quod me nutrit, me destruit (What nourishes me, also destroys me.)",
  "Most women live their lives in a state of starvation. Why should I be any different?",
  "It's simple: You decide once and for all that you aren't going to eat, and there are no further decisions to make.",
  "In the body, as in sculpture, perfection is attained not when there is nothing left to add, but when there is nothing left to take away.",
  "It's not deprivation, it's liberation.",
  "Being normal is over rated.",
  "Food is like art, to be looked at not eaten.",
  "Every time you say no thank you to food, you say yes please to thin.",
  "You have a choice to make, do you want to be Normal and overweight like the rest of the world, Or do you want to be unique and be that girl every overweight person wants to be? It's all up to you.",
  "I do eat normally: only what is needful for survival. I can't help it that we live in a piggish society where gluttony is the norm, and everyone else is constantly stuffing themselves.",
  "Think higher of yourself, your too good to put that in your body.",
  "Anorexia is not a self-inflicted disease, it's a self-controlled lifestyle.",
  "When I wake, I'm empty, light-headed. I like to stay this way, free and pure, light on my feet, traveling light. For me, food's only interest lies in how little I need, how strong I am, how well I can resist, each time achieving another small victory of the will.",
  "The difference between want and need is self control.",
  "I've come too far to take orders from a cookie.",
  "They always say they're concerned with me, about my health, when all they want to do is control me. They want to pin me down and force-feed me with lies, with what they call love.",
  "The greasy fry, it cannot lie, its truth is written on your thigh.",
  "They say I could die if I get to thin and I tell them I Could die getting to fat also. The difference is dieing thin is a challenge and I am not one to give up one a challenge.",
  "We are prisoners of our taste buds - BREAK FREE!",
  "I want my collarbones and hips to be as sharp as my mind.",
  "You can learn to love anything I think, if you need to badly enough. I trained myself to enjoy feeling hungry. If my stomach contracts, or I wake up feeling nauseated, or I'm light-headed, or have a hunger headache or better yet, all of the above, it means I'm getting thinner, it feels good. I feel strong, on top of myself, in control.",
  "Denying yourself food is not true deprivation - never being thin is.",
  "There is no try, there is only DO.",
  "I have a rule when I weigh myself. If I've gained then I starve the rest of the day. But if I've lost, then I starve too.",
  "Re-measure, reweigh, try harder.",
  "Your body is the baggage you must carry through life. The more excess baggage the shorter the trip.",
  "You have such a pretty face, why don't you try dieting?",
  "Pain is temporary; Pride is forever.",
  "An imperfect body reflects an imperfect person.",
  "Don't give up what you want most for what you want at the moment.",
  "I'm a teenage drama queen, I'll throw my guts up for self esteem.",
  "Empty is pure, starving is the cure.",
  "Be like a postage stamp. Stick to one thing until you get there.",
  "Like a plant, surely the body can be trained to exist on nothing, to take it's nourishment from the air.",
  "Feed the soul; let the body fast.",
  "If you close your mouth to food, you can know a sweeter taste.",
  "The less I swallowed, the more I declined, the more I hope to pare things down to the essentials.",
  "The more they give me, the less I'll eat.",
  "Eat less, weigh less.",
  "Thin has a taste all its own.",
  "Happy or sad, rich or poor, it's better being thin.",
  "I don't care if it hurts, I want to have control, I want a perfect body, I want a perfect soul.",
  "If it tastes good, It's trying to kill you.",
  "An ordinary girl, an ordinary waist - but ordinary's just not good enough today.",
  "The word is control. That's my ultimate - to have control.",
  "I am your butter and your bread. The voice that's in your head. I'll take you in and fill you up with a lack of being fed -Ana",
  "I want to be the smallest I can possibly be...when I see bone, that's the day I will finally feel free...",
  "I'm not yet a winner. I could be thinner. So I must go throw up dinner.",
  "Giving in to food shows weakness, be strong and you will be better than everyone else.",
  "I'm not starving myself. I'm perfecting my emptiness.",
  "I, the hunger artist, rarely disappoint my audience.",
  "How many pounds till I am happy? How many pounds till I get thin? Three more pounds till I am skinny, three more pounds and I win!",
  "Anorexia is not a disease. Anorexia is not a game. Anorexia is a skill, perfected only by a few. The chosen, the pure, the flawless.",
  "Anorexia is like a game; you play, you win, and then it's over. Or you keep playing.",
  "Nothing. Nothing is wrong. And asking is against the rules. Crying is against the rules. Your strong, don't let them break you. They're trying to destroy you.",
  "When it comes to losing weight, those who can do; those that can make excuses.",
  "Don't eat. If you want to see food, look in the mirror at your thighs.",
  "What's in your fingers today is on your hips tomorrow.",
  "The only freedom left is the freedom to starve.",
  "You are what you eat.",
  "Good habits result from resisting temptation.",
  "There are admirable potentialities in every human being. Believe in your strength and your youth. Learn to repeat endlessly to yourself, 'It all depends on me'.",
  "Food is the most primitive form of comfort.",
  "Act as if it were impossible to fail.",
  "Blessed are the starving, for they shall teach us not to want.",
  "You want food? Look at those THIGHS!",
  "Fridge pickers wear big knickers.",
  "Don't eat anything today that you'll regret tomorrow.",
  "Craving is only a feeling.",
  "Bones define who we really are, let them show."
];

const selfcontroltips = [
  "Keep a food diary. Write down everything you eat and anything else you feel might be helpful to know. This will allow you to measure progress and track patterns over time.",
  "Set yourself rules regarding food. Pick ones that you know you can follow and stick with them. Then, keeping these, gradually add on more rules until your eating is entirely under control. It is hard to restrict yourself all the way at once, and more effective to do it in increments. The idea here is to sort of sneak up on yourself in tiny little stages, adapting to each new rule before making another.",
  "Reward yourself, do not punish. Punishment is not effective and will do more emotional harm than physical good. Calculate how much money you are saving by not eating and add this up until you have enough to buy something you like (but not food). Or, put a penny (dollar, marble) in a jar for every small goal you keep and treat yourself with something (not food) once you reach a certain amount. Remember that these rewards will last longer and give more pleasure than food you would just eat, process, and discard.",
  "Eat slowly, in small bites. Cut your food up into small pieces. Pause while eating to drink water or whatever other liquid you enjoy. It takes a while for full signals to get from our stomach to our brain. Also, if you eat over a longer period of time and add more liquids, it can trick your mind into thinking you have eaten more.",
  "Take out only the amount of food you plan on eating. Wrap everything securely up before you start eating and put it away. Do not go back for seconds. Do not nibble while preparing food, either. Those bites and crumbles add up staggeringly fast.",
  "Think about food before and while you eat it. Think about where it came from and exactly what happened to it before it reached you. This works particularly well with meat, dairy, and egg products",
  "Food associations. Find something that makes you feel vaguely ill or unpleasant, get a picture of it, and put the picture beside your food. Switch pictures frequently and make sure to look at the pictures while you eat. After a while you may began to associate food itself with unpleasantness, which will make you less inclined to eat",
  "Give yourself permission before eating. Stop and think about it, consider if you really want to eat whatever-it-is. If your answer is yes, then say (or think) something like I am allowed to eat this or I have permission to eat this.",
  "Plan your meals in advance, for the day or week or whatever. Decide what you are allowed to eat each day. If you know that you will be eating, it may help you avoid eating other things.",
  "If you feel yourself starting to lose control while you are eating, stop. Set your food down, take a long drink of water or some other cool liquid, and take a deep breath before resuming eating. This can help interrupt a slide into binge-mode. Remember to remind yourself that you are still going to finish your food and that you are not stopping, just pausing for a moment.",
  "Sabotage your food. Make it with too much water, too little sugar, an ingredient you do not care for. Add too much salt or pepper before you eat. You will eat less of it if it tastes bad.",
  "Pick apart your food cravings. If you eat food in separate parts instead of all mixed into one, it feels like you have eaten more and you do not get extra stuff you do not really need. For example, if you are really craving pizza, think about what it contains. Bread, tomato sauce, cheese. Drink a can of V8 or eat a tomato. If you still want pizza, have a rice cake or a few crackers or some other starch. If you still want pizza, have a piece of cheese. Or if you are craving peanut butter, have a handful of peanuts and avoid the added sugar and oil contained in most commercial peanut butter. If that does not work, eat a spoonful of honey for the sweetness overload. Same net effect, fewer total calories, no wasted empty added crap."
];

const funny = [
  "If you eat something and no one sees you eat it, it has no calories.",
  "If you drink a diet soda with a candy bar, the calories are cancelled out.",
  "When you eat with someone else, calories don't count if you don't eat more than they do.",
  "Foods eaten while watching TV do not count."
];

/* =========================
   UTIL
========================= */

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   HOME PAGE ONLY (random content)
========================= */
function renderHome() {
  const motivationEl = document.getElementById("motivation");
  const reasonEl = document.getElementById("reason");
  const tipEl = document.getElementById("tip");
  const funnyEl = document.getElementById("funny");

  if (motivationEl) motivationEl.innerText = randomItem(motivationalQuotes);
  if (reasonEl) reasonEl.innerText = randomItem(reasons);
  if (tipEl) tipEl.innerText = randomItem(selfcontroltips);
  if (funnyEl) funnyEl.innerText = randomItem(funny);
}

/* =========================
   LIST PAGES (FULL DISPLAY)
========================= */
function renderList(arr, elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;

  el.innerHTML = "";

  arr.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerText = item;
    el.appendChild(div);
  });
}

/* =========================
   PAGE ROUTING (AUTO DETECT)
========================= */
function renderPage() {
  renderHome();

  renderList(reasons, "reasonList");
  renderList(selfcontroltips, "tipList");
  renderList(funny, "funnyList");
}

/* =========================
   ON LOAD
========================= */
window.onload = function () {
  let data = JSON.parse(localStorage.getItem("history")) || {};
  let streak = localStorage.getItem("streak") || 0;

  const streakEl = document.getElementById("streak");
  if (streakEl) streakEl.innerText = "🔥 Streak: " + streak;

  renderHistory(data);
  renderPage();
};