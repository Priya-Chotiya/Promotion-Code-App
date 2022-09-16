import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PromotionCodeService } from '../services/promotion-code.service';
import { PromotionCode } from './promotion-code';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-promotion-code',
  templateUrl: './promotion-code.component.html',
  styleUrls: ['./promotion-code.component.scss'],
})
export class PromotionCodeComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'promotionCode',
    'discount',
    'status',
    'type',
    'startDate',
    'endDate',
    'actions',
  ];
  dataSource = new MatTableDataSource<PromotionCode>([]);
  statusData: string[] = ['Pending approval', 'Inactive', 'Active'];
  routeSubscription: Subscription = new Subscription();
  pageLength = 0;
  options = { page: 1, limit: 5, promotionCode: null, status: null };
  public addDataForm: FormGroup;
  public filterForm: FormGroup;

  constructor(
    private promotionCodeService: PromotionCodeService,
    public dialog: MatDialog,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('addDataDialog', { static: true }) addDataDialog: TemplateRef<any>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.createForm();
    this.getAllCodes();

    this.filterForm = new FormGroup({
      promotionCode: new FormControl(''),
      status: new FormControl(0),
    });
  }

  createForm() {
    this.addDataForm = new FormGroup({
      _id: new FormControl(''),
      promotionCode: new FormControl('', [Validators.required]),
      discount: new FormControl(0, [Validators.required]),
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    });
  }

  public formError = (controlName: string, errorName: string) => {
    return this.addDataForm.controls[controlName].hasError(errorName);
  };

  getAllCodes(): void {
    this.routeSubscription.add(
      this.promotionCodeService.getAll(this.options).subscribe(
        (data) => {
          this.dataSource = new MatTableDataSource(data.promotionCode);
          this.pageLength = data.total;
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  filterData(e: any) {
    this.options.promotionCode = e.target.value;
    this.paginator.firstPage();
    setTimeout(() => {
      this.getAllCodes();
    }, 500);
  }

  onChangeStatus(value: any) {
    this.options.status = value;
    this.paginator.firstPage();
    this.getAllCodes();
  }

  resetFilters() {
    this.filterForm.reset();
    this.options.status = null;
    this.options.promotionCode = null;
    this.getAllCodes();
  }

  onPageChange(e: any) {
    this.options.page = e.pageIndex + 1;
    this.options.limit = e.pageSize;

    this.getAllCodes();
  }

  openDialog() {
    this.dialog.open(this.addDataDialog);
  }

  submitForm() {
    let obj = Object.assign({}, this.addDataForm.value);

    obj.startDate = moment(obj.startDate).format('DD-MM-YYYY');
    obj.endDate = moment(obj.endDate).format('DD-MM-YYYY');

    if (obj._id) {
      this.routeSubscription.add(
        this.promotionCodeService.update(obj._id, obj).subscribe(
          (response) => {
            alert('Data successfully updated');
            this.getAllCodes();
            this.formReset();
          },
          (err) => {
            alert(err);
          }
        )
      );
    } else {
      delete obj._id;
      this.routeSubscription.add(
        this.promotionCodeService.create(obj).subscribe(
          (response) => {
            alert('Data successfully added');
            this.getAllCodes();
            this.formReset();
          },
          (err) => {
            alert(err);
          }
        )
      );
    }
  }

  formReset() {
    this.addDataForm.reset();
    this.dialog.closeAll();
  }

  editData(element: any) {
    let obj = Object.assign({}, element);

    obj.startDate = moment(obj.startDate, 'DD-MM-YYYY').toDate();
    obj.endDate = moment(obj.endDate, 'DD-MM-YYYY').toDate();

    this.addDataForm.patchValue(obj);
    this.dialog.open(this.addDataDialog);
  }

  deleteData(element: any) {
    this.promotionCodeService.delete(element._id).subscribe(
      (response) => {
        alert('Data successfully deleted');
        this.getAllCodes();
      },
      (err) => {
        alert(err);
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to avoid memory leaks
    this.routeSubscription.unsubscribe();
  }
}
