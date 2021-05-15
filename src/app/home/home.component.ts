import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AnswerBlock, AnswerSheet } from '../core/model/answer-sheet.model';
import { Answer } from '../core/model/answer.model';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  answerSheet: AnswerSheet = {
    title: '',
    answerList: [],
    result: 0,
  };
  generateForm: FormGroup;
  // answerSheetForm: FormGroup;
  blockSize = 5;

  constructor(fb: FormBuilder) {
    this.generateForm = fb.group({
      title: ['', Validators.required],
      numberOfQuestion: [10, Validators.required],
    });
  }

  ngOnInit(): void {}
  onGenrateSheet() {
    console.log('generate form: ', this.generateForm.value);
    this.answerSheet.title = this.generateForm.get('title')!.value;
    let answerBlockIndex = 0;
    let answerBlock: AnswerBlock = { answerBlock: [], id: answerBlockIndex };
    const numberOfQuestion = this.generateForm.get('numberOfQuestion')!.value;
    for (let index = 0; index < numberOfQuestion; index++) {
      // const element = this.generateForm.get('numberOfQuestion')!.value[index];
      let answer: Answer = {
        id: index + 1,
        selectedValues: [],
        isCorrect: false,
      };

      answerBlock.answerBlock = answerBlock.answerBlock.concat(answer);
      if (
        answerBlock.answerBlock.length >= this.blockSize ||
        index == numberOfQuestion - 1
      ) {
        this.answerSheet.answerList = this.answerSheet.answerList.concat(
          answerBlock
        );
        answerBlockIndex = answerBlockIndex + 1;
        answerBlock = { answerBlock: [], id: answerBlockIndex };
      }
    }

    console.log('answer sheet', this.answerSheet);
  }

  onReset() {
    this.answerSheet = {
      title: '',
      answerList: [],
      result: 0,
    };
  }

  onCorrectCheck(
    event: MatCheckboxChange,
    blockId: number,
    questionId: number
  ) {
    console.log(event, blockId, questionId);
    this.answerSheet.answerList[blockId].answerBlock.filter(
      (answer) => answer.id == questionId
    )[0].isCorrect = event.checked;

    this.updateResult(this.answerSheet);
  }

  updateResult(answerSheet: AnswerSheet) {
    answerSheet.result = 0;
    answerSheet.answerList.forEach((answerblock) => {
      answerblock.answerBlock.forEach((answer) => {
        if (answer.isCorrect) {
          answerSheet.result++;
        }
      });
    });
  }
}
