/*



test strategies.
test planning.
test designing.
bug life cycyle.
agile methodologies.
different types of methodologies.

how do you execute this test in a multiple environments and how you will maintain the property file.
what type of issues you will face while testing in a different environments and waht type of environments you have?
what is the execution time.
critical issue raised then how you will deal with developer?

how to test?
how to analyze the defect(bug)?

seniero:  
if you click on the login button but it is not working, instead of reporting directly to the ui developer, just open your dev tools and check consoles and network tab and analyze the errors and report to the team(ui, backend, devlops) accordongly. 


how important it is how you are communicating a defect to the developer, it should not feel negatively.



full stack automation tester:
manual testing, automation testing, performance testing, and security testing, 




hello, good evening,

thank you for having with me today. my name is shivaji. i am a recent graduate in cse from aditya college of eng and i also hold diploma in cse from prasiddha college of eng & tech. during my academic, i developed a stronge foundation in javascript, reactjs and react native framework. in my final year, i lead a team project where we develop cross mobile application using react native framework. which allowed me to apply my skills in a more practical way. thank you...




phrases: you can use these phrases after the interviwer has said hello, thank you for being here.

  - thank you for taking the time to meet with me today.

  - i'm really interested to learn more about the postion and how i can contribute to your team.

  - i appreciate the chance to speak with you about how my background fits this role.     

  - it's a pleasure to be here.

   Example: it's a pleasure to be here. thank you for taking the time to meet with me today.


2: discussing your experience: 
  - I lead a project involving [task], which improved [outcome].
      ex: at xyz company, I lead project involving and the task or project which improved  and then you say the outcomes.
  - my role at [previous job] include  [responsibilty], and i developed strong skills in [skills].
  - one significant accomplishment in my last position was [achievement], which demonistrates my ability to [relevent skills].
  - i have over [number] years of experience in [field], including [specific task or project], which has honed my expertise in [skill].

3: discussing skills and qualification:
  - I'm proficient in [skills or tools], which utilised to [example or project]
  - my experience with [specific tool or method]  has equipped me with the necessary to succeed in this role.
  - I hold a [degree/certications] in field, which has prrovided me with a strong foundation in [skills/area].
  - I have strong background in [Area] and i am confident in my ability to contribute to your team.
  
  
4: 
  - In a previouss role, i faced [situation], and i addressed it by [action], resulting in [positive outcome].
  - I managed a difficult project by [method], ensuring that [result/impact].
    ex: i faced a [situation]. i handled it by [action], which led to [result].
  - when dealing with a tight deadlines, i [method/strategy] to ensure everything was completed on time.
  - i resolved a conflict with a colleague by [approach] resulting in [positive outcome].
  
5: expressing enthusiasm about Role: 
  - my experience with [relevent skills] and my interset in [company's specific project/value] make me confident that i would be a valuable addition to your team

6: Asking questions:
   - what are the most important qualities you're looking for in a candidate for this role.
   - can you provide with some more details about the day to day responsibilities and key projects in this role?
   - how does the company measures success for this role?
   - what opportunities for growth and development does your company offer.
   - what are the key challenges   


7: ending the interview:
    - Thank you for considering my application. 
    - i'm looking forward to the next step. 
    - please let me know if there is any additional information i can provide.
    - thank tou for the opportunity to inetrview 


example: 

Hello, Good Afternoon,

It's a pleasure to be here. thank you for taking the time to meet with me today. my name is shivaji. i am a recent graduate in cse from aditya college of engineering and i also hold diploma in cse from prasiddha college of eng & tech. during my academic, i developed a stronge foundation in javascript, reactjs and react native framework. in my final year, i lead a team project where we develop an food ordering mobile application using react native framework and firebase . which allowed me to apply my skills in a more practical way. thank you.

Thank you for considering my application. please let me know if there is any additional information i can provide.



7: ending the interview:
    - Thank you for considering my application. 
    - i'm looking forward to the next step. 
    - please let me know if there is any additional information i can provide.
    - thank tou for the opportunity to inetrview 



shall i share my screen?

r you able to see my screen?

sorry i was on mute?




Can you describe my role in detail, what will I do daily?

What are the next steps in the interview process?




fiber: A fiber is a non-blocking unit of execution?
unit of execution: A program
non-blocking?

program: a set of lazily evaluated, immutable steps.
immutable? unchanging(at least during execution)
lasy: only run when its needed.


function are immutable, you can change propeties of the function object but the actual source code connot be modified after you define the function.

function foo(){
  console.log("foo start")
  console.log("foo end")
}
function bar(){
  console.log("bar start")
  console.log("bar end")
}
foo()
bar()

in javascript, all synchronous function are blocking. the easiest way to get a non-blocking function is to make it asynchronous. so lets make foo is non-blocking.
if you run it again we'll see that bar has actually inserted itself in the middle of foo execution. this is where yielding comes in. foo starts and when it reaches to await block(). yield back control to the javascript runtime which allows something else to run in. in this case bar function so foo start, it yields, bar runs and then goes back to continue foo function. this pattern of having two different things running at the same time is called multi tasking.

  async function foo(){
    console.log("foo start")
    const promise = new Promise((res)=> res())
    console.log("foo end")
  }
  function bar(){
    console.log("bar start")
    console.log("bar end")
  }
  foo()
  bar()

cooperative multitasking:
  - how javascript's event loop works.
  - the main thread must first yield control before other tasks can run.
  - whether that's the stack being empty, or awating a promise.
  - tasks are literally just a callback in a queue.
  
in javascript, there is only one main thread and so whatever is running on that main thread has to finish or yield control somehow for something else to run and so the way this usally look like is either code hits wait point or call stack is empty.
tasks are just callbacks in a queue. as function goes along we initiate these callback which end up in this callback queue and when the call stack is empty, the run time pulls the next thing of the callback queue and continue execution, this called cooperative because the functions itself have to yield. everything is synchronous utill ypu hit the await point. there is no poassible way to yield outside of explicity calling await.

preemptive multitasking: instead of waiting for function to yield, something else preemptively stops it and so in this model, each seperate task runs as if it's the only thing running and occasionally it gets stopped by some external schedulers so this how operating systems works.

pre-react 18 with non concurrent rendering: rendering a react tree is a purely synchronous opeartion which just kind of recursively calling all the components but if you have big component tree, this can take significant time to resolve and again because of javascript is single threaded for that time we block the main thread,  any event handler or state updates that happen during that time get pushed until the main thread yields which is at the end of that big successive render and the result of this would mean that your application feel unresponsive. and you clicked and you expect something to happen but react was finishing a big synchronous render and so the click event wouldn't actually go through utill a little bit later. so react team introduced a solution: react 18 with concurrent rendering.

react 18 with concurrent rendering is to make that big synchronous opeartion, non blocking using a fiber model and the idea is that because its non blocking even though its purely synchronours it will occasionally yield and when it yields there's chances for these state updates or events to trigger and your application feel a lot more responsive.


we creating our own language inside js called dsl and we write our programs in dsl language and it contains of like a big tree of objects which all all the steps of our program and then we create a interpretter also in javascript which traverse that tree and executes each step one at a time. in this interpretter main loop we either internally or externally it can choose not to execute the next step and instead save its state and schedule asynchronously to pick back up and resume.execution of steps kinf of occasionally yield back up and allow other stuff to run 




cascadia code, Consolas

*/
