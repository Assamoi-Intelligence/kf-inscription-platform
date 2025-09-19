import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { Competition } from '../../models/competition';
import { ConfirmationService, MessageService} from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CompetitionAdd } from '../competition-add/competition-add';
import { Competitions } from '../competitions';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ParticipantAdd } from '../../participants/participant-add/participant-add';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PrintService } from '../../print/print.service';

@Component({
  selector: 'app-competition-list',
  imports: [
    CommonModule, RouterModule, TableModule,
    IconFieldModule, InputIconModule, InputTextModule,
    ButtonModule, DialogModule, TagModule, DividerModule,
    ConfirmDialogModule
  ],
  templateUrl: './competition-list.html',
  styleUrl: './competition-list.css',
  providers: [MessageService, ConfirmationService, DialogService]
})
export class CompetitionList implements OnInit {
  protected competitionList = signal<Competition[]>([]);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private competitionsService = inject(Competitions);
  private confirmationService = inject(ConfirmationService);
  private destroyRef = inject(DestroyRef);
  private printService = inject(PrintService);

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    try {
      const list = await this.competitionsService.getAll();
      const participantPromises = list.map(async (competition) => {
        try {
          competition.participants = await this.competitionsService.getParticipants(competition.id);
        } catch (err) {
          console.log(err);
          competition.participants = []; // fallback
        }
        return competition;
      });
      await Promise.all(participantPromises);
      this.competitionList.set(list);
    } catch (err) {
      console.log(err);
    }
  }

  onAddCompetition()  {
    this.dialogService.open(CompetitionAdd, {
      header: 'Ajouter une compétion',
      closable: true,
    }).onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isAdded => {
      if (isAdded) this.competitionsService.getAll();
    });
  }

  onEdit(competition: Competition) {
    this.router.navigate(['/competitions', competition.id]);
  }

  onDelete(competition: Competition) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette compétition ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.competitionsService.delete(competition).then(() => {
          this.competitionList.set(this.competitionList().filter(el => el.id !== competition.id));
        }).catch(err => console.log(err)).finally(() => this.confirmationService.close());
      }
    });
  }

  onAddParticipant(competition: Competition) {
    this.dialogService.open(ParticipantAdd, {
      header: 'Ajouter une compétion',
      closable: true,
      data: {competition},
      width: '35%',
    }).onClose.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(isAdded => {
      if (isAdded) this.getAll();
    });
  }

  onPrint(competition: Competition) {
    if (!competition.participants || competition.participants.length === 0) return;
    if (competition.type === 'sanda') this.printService.printSandaCompetition(competition.participants);
    if (competition.type === 'tao-lu') this.printService.printTaoLuCompetition(competition.participants);
  }
}
