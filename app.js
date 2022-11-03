let screenwelcome = document.getElementById('welcomescreen');
let questionScreen = document.getElementById('questionScreen');
let resultScreen = document.getElementById('resultScreen');

function Quiz() {
    this.questions = [];
    this.nbCorrects = 0;
    this.indexCurrentQuestion = 0;

    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    this.showCurrentQuestion = function() {

        if (this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion+1, this.questions.length
            );
        }
        else
        {
            questionScreen.classList.add('hidden');
            let elNbCorrects = document.getElementById('nbcorrect');
            elNbCorrects.innerHTML = quiz.nbCorrects;

            resultScreen.style.display = 'block';
        }

    }
}

function Question(title, answers, answerCorrect)  {
    this.title = title;
    this.answers = answers;
    this.answerCorrect = answerCorrect;

    this.getElement =  function(indexQuestion, nbQuestions) {
        let questionNumber = document.createElement('h2');
        questionNumber.classList.add('quizSubtitle');
        questionNumber.textContent = "Question " + indexQuestion + "/" + nbQuestions;

        questionScreen.append(questionNumber);

        let questionTitle = document.createElement('h3');
        questionTitle.textContent = this.title;
        questionScreen.append(questionTitle);

        let questionAnswers = document.createElement('ul');
        questionAnswers.classList.add("questionanswer");
        
        this.answers.forEach((answer, index) => {
            let elAnswer = document.createElement('li');
            elAnswer.classList.add('answer');
            elAnswer.textContent = answer;
            elAnswer.id = index+1;
            elAnswer.addEventListener('click', this.checkAnswer);
    
            questionAnswers.appendChild(elAnswer);
        });

        questionScreen.append(questionAnswers);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    }

    this.checkAnswer = (e) => {
        let answerSelected = e.target;
        if (this.isCorrectAnswer(answerSelected.id)) {
            answerSelected.classList.add('answer--correct');
            quiz.nbCorrects++;
        }
        else
        {
            answerSelected.classList.add('answer--wrong');

            let elRightAnswer = document.getElementById(this.answerCorrect);
            elRightAnswer.classList.add("answer--correct");
        }

        setTimeout(function() {
            questionScreen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.showCurrentQuestion();
        }, 1000);
    }

    this.isCorrectAnswer = function(answerUser) {
        if (answerUser == answerCorrect) {
            return true;
        }
        else
        {
            return false;
        }
    }
};

//mes questions

let quiz = new Quiz();

let question1 = new Question("Quels est l'âge du capitaine?", [42, 101, 18], 1);
quiz.addQuestion(question1);

let question2 = new Question("Quelle est la différence entre un pigeon?", ["Gloouu", "hu?", "La longueur de ses pattes"], 3);
quiz.addQuestion(question2);

let question3 = new Question("Qu'est ce qui est jaune et qui attend ?", ["Jonathan", "Hommer Simpson", "Un citron pressé"], 1);
quiz.addQuestion(question3);

let question4 = new Question(`Qui aime le plus sophie ?`, ['Elias', 'Ambre', 'John'], 3);
quiz.addQuestion(question4);



let  elNbQuestion = document.getElementsByClassName('nbquestion');

for(let i=0; i<elNbQuestion.length; i++) {
    elNbQuestion[i].innerHTML = quiz.questions.length;
}

function seeFirstQuestion() {
    screenwelcome.classList.add('hidden');
    questionScreen.style.display = 'block';

    quiz.showCurrentQuestion();
}

let quiz__btn = document.getElementById('quizBtn');
quiz__btn.addEventListener('click', seeFirstQuestion);