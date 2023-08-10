import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  
  @ViewChild(IonModal) modal: IonModal;
  
  message = 'This feedback is sent to our team for furture improvements.  :)';
  name;
  
  cancel(): void {
    this.modal.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}  :)    Your Feedback has been recorded.`;
      
    }
  }
  @Input() rating: number;
  
  @Output() ratingChange: EventEmitter<number> = new EventEmitter();;


  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Thank you.',
      subHeader: 'Your Feedback has been recorded.',
      buttons: ['OK'],
    });

    await alert.present();
    document.querySelector('ion-input').value = '';
    document.querySelector('ion-radio-group').value = '';
    document.querySelector('ion-range').value = 0;
  }

  
  

  // rate(index: number) {
  //   this.rating =index;
  //   this,this.ratingChange.emit(this.rating);
  // }
  // getColor(index: number) {
  //   if(this.isAboveRating(index)){
  //     return COLORS.GREY;
  //   }
  //   switch(this.rating){
  //     case 1:
  //     case 2:
  //       return COLORS.RED;
  //     case 3:
  //       return COLORS.YELLOW;
  //     case 4:
  //     case 5:
  //       return COLORS.GREEN;
  //     default:
  //       return COLORS.GREY;
  //   }
    
  // }

  // isAboveRating(index: number): boolean {
  //   return index > this.rating;
  // }


  ngOnInit() {
  }

}
