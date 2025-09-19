import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Participants } from '../participants';
import { ParticipantAdd } from '../participant-add/participant-add';
import { Participant } from '../../models/participant';
import { DialogService } from 'primeng/dynamicdialog';
import { ParticipantEdit } from '../participant-edit/participant-edit';
import { Competition } from '../../models/competition';
import { PrintService } from '../../print/print.service';
import { sandaTestParticipants, taoLuTestParticipants } from '../../categories/category.list';

@Component({
  selector: 'app-participant-list',
  imports: [
    CommonModule, RouterModule, TableModule,
    IconFieldModule, InputIconModule, InputTextModule,
    ButtonModule, DialogModule, TagModule, DividerModule,
    ConfirmDialogModule
  ],
  templateUrl: './participant-list.html',
  styleUrl: './participant-list.css',
  providers: [DialogService, MessageService]
})
export class ParticipantList {

  participantsList = model<Participant[]>([]);
  competition = model<Competition| null>(null);
  private dialogService = inject(DialogService);
  private participantsService = inject(Participants);
  private confirmationService = inject(ConfirmationService);
  private printService = inject(PrintService);

  onAddParticipant()  {
    this.dialogService.open(ParticipantAdd, {
      header: 'Ajouter un participant',
      closable: true,
      data: {competition: this.competition()}
    });
  }

  onEdit(participant: Participant) {
    this.dialogService.open(ParticipantEdit, {
      header: 'Editer un participant',
      closable: true,
      data: {participant, competition: this.competition()}
    });
  }

  onDelete(participant: Participant) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce participant ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.participantsService.delete(participant).then(() => {
          console.log("Participant supprimé");
        }).catch(err => console.log(err)).finally(() => this.confirmationService.close());
      }
    });
  }

  onPrint() {
    console.log('Print')
    if (this.competition()?.type === 'sanda') {
      this.printService.printSandaCompetition(sandaTestParticipants);
    } else {
      this.printService.printTaoLuCompetition(taoLuTestParticipants);
    }
  }
}
