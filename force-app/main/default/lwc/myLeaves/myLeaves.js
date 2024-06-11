import { LightningElement, wire } from 'lwc';
import getMyLeaves from '@salesforce/apex/LeaveRequstController.getMyLeaves'; // get apex method for caching
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; /* used for show success message */
import Id from '@salesforce/user/Id'; //get current logged in user id

const COLUMNS=[
    { label: 'Request Id', fieldName: 'Name', cellAttributes:{class:{fieldName:'cellClass'}}},
    { label: 'From Date', fieldName: 'From_Date__c', cellAttributes:{class:{fieldName:'cellClass'}}},
    { label: 'To Date', fieldName: 'To_Date__c', cellAttributes:{class:{fieldName:'cellClass'}}},
    { label: 'Reason', fieldName: 'Reason__c', cellAttributes:{class:{fieldName:'cellClass'}}},
    { label: 'Status', fieldName: 'Status__c', cellAttributes:{class:{fieldName:'cellClass'}}},
    { label: 'Manager Comment', fieldName: 'Manager_Comment__c', cellAttributes:{class:{fieldName:'cellClass'}}},
    {
        type:"button", typeAttributes:
        {
            label:'Edit',
            name:'Edit',
            title:'Edit',
            value:'Edit',
            disabled:{fieldName:'isEditDisabled'}
        }, cellAttributes:{class:{fieldName:'cellClass'}},
    }
];
export default class MyLeaves extends LightningElement {

    myLeaves = [];
    myLeavesWireResult;
    columns=COLUMNS;
    showModalPopup = false;
    objectApiName = 'LeaveRequest__c';
    recordId='';
    currentUserId = Id;

    @wire(getMyLeaves)
    wiredMyLeaves(result){
        if(result.data){
            this.myLeaves = result.data.map(a => ({
                ...a,
                cellClass: a.Status__c == 'Approved' ? 'slds-theme_success': a.Status__c == 'Rejected' ? 'slds-theme_warning' : '',
                isEditDisabled: a.Status__c != 'Pending'
        }));
        }
        if(result.error){
            console.log('Error while fetching leaves --> ', result.error);
        }
    }

    get noRecordsFound(){
        return this.myLeaves.length == 0;
    }

    popupCloseHandler(){
        this.showModalPopup=false;
    }
    rowActionHandler(event) {
        this.showModalPopup = true;
        this.recordId = event.detail.row.Id;
    }

    successHandler(){
        this.showModalPopup=false;
        this.ShowToastEvent('Data saved successfully');
    }

    newRequestClickHandler() {
        this.showModalPopup = true;
        this.recordId = '';
    }

    ShowToastEvent(message, title ='success', variant='sucess'){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}