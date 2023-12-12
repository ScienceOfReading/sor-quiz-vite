<template>
  <div class="border-stone-300 w-72 quiz-item ">
    <h5 class="text-stone-400">'Advanced Phonemic Awareness' 1</h5>
    <p class="question-text">In practice, teaching 'Advanced Phonemic Awareness' involves:</p>
    <ul class="w-96 bg-stone-400">
      <li class="w-full p-4 answer">
        <span class="list-asking"><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
            viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
            <path opacity="1" fill="#1E3050"
              d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
          </svg></span>
        <span class="list-item-right">Rhyming</span>
      </li>
      <li class="w-full p-4">Blending and segmenting onset-rimes</li>
      <li class="w-full p-4">Phoneme addition and deletion</li>
      <li class="w-full p-4">Phoneme Manipulation</li>
    </ul>
    <div class="explanation">
      <P>This video illustrates: <a href="https://youtu.be/Nh3r2WZs2P8?si=9wZ9XWrCTioUaVkG">Phoneme Addition</a> </P>
      <P><svg xmlns="http://www.w3.org/2000/svg" height="16" width="16"
          viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
          <path opacity="1" fill="#1E3050"
            d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
        </svg> The practice has not yet been studied.</P>
    </div>
  </div>

  <div class="w-72 quiz-item">
    <h5>"Advanced Phonemic Awareness 2"</h5>
    <p class="question-text">The practice of teaching 'Advanced Phonemic Awareness' was first suggested by:</p>
    <ul class="w-96">
      <li class="w-full rounded-lg bg-primary-100 p-4 text-primary-600">
        An item
      </li>
      <li class="w-full p-4">Marie Clay</li>
      <li class="w-full p-4">David Kilpatrick</li>
      <li class="w-full p-4">Heggerty</li>
      <li class="w-full p-4">Fontas & Pinnell</li>
    </ul>
    <div class="explanation">
      <P>Kilpatrick discovered a pattern of how some struggling children were succeeding, and hypothesized that </P>
      <P>The practice has not yet been studied, and Kilpatrick regrets the choice of name.</P>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuizItem',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
}

li {}

a {
  color: #42b983;
}

.quiz-item {
  border-style: solid;
  border-top-right-radius: 2dvw;
  border-radius: 2dvw;
  margin: 12px;
}

.question-text {
  margin: 3;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 400;
}

.answer {
  margin: 5px;
}

.list-asking {
  width: 100px;
  border-style: solid;
  border-color: #999999;
  border-width: 1px;
  border-top-left-radius: 5pt;
  border-bottom-left-radius: 5pt;
  border-right-style: solid;
  padding: 5px;
}

.list-item-right {

  border-style: solid;
  border-color: #999999;
  border-width: 1px;
  border-top-right-radius: 5pt;
  border-bottom-right-radius: 5pt;
  border-right-style: solid;
  border-left-style: none;
  padding: 5px;
}
</style>
