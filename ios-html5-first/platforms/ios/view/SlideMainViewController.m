//
//  MainViewController.m
//  LeftRightSlider
//
//  Created by Zhao Yiqi on 13-11-27.
//  Copyright (c) 2013年 Zhao Yiqi. All rights reserved.
//

#import "SlideMainViewController.h"

@interface SlideMainViewController ()

@end

@implementation SlideMainViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    self.wantsFullScreenLayout=YES;
    self.view.backgroundColor=[UIColor blueColor];
    
    UIImageView *imgV=[[UIImageView alloc] initWithFrame:[UIScreen mainScreen].bounds];
    [imgV setImage:[UIImage imageNamed:@"1111"]];
    [self.view addSubview:imgV];
    
    UIView *navBar=[[UIView alloc] initWithFrame:CGRectMake(0, 0, self.view.frame.size.width, 44+[UIApplication sharedApplication].statusBarFrame.size.height)];
    navBar.backgroundColor=[UIColor whiteColor];
    navBar.alpha=0.8;
    [self.view addSubview:navBar];
    
    UIButton *leftBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    leftBtn.frame = CGRectMake(0, [UIApplication sharedApplication].statusBarFrame.size.height, 44, 44);
    [leftBtn setTitle:@"左" forState:UIControlStateNormal];
    [leftBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [leftBtn addTarget:self action:@selector(leftItemClick) forControlEvents:UIControlEventTouchUpInside];
    [navBar addSubview:leftBtn];
    
    UIButton *rightBtn = [UIButton buttonWithType:UIButtonTypeCustom];
    rightBtn.frame = CGRectMake(self.view.frame.size.width-44, [UIApplication sharedApplication].statusBarFrame.size.height, 44, 44);
    [rightBtn setTitle:@"右" forState:UIControlStateNormal];
    [rightBtn setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [rightBtn addTarget:self action:@selector(rightItemClick) forControlEvents:UIControlEventTouchUpInside];
    [navBar addSubview:rightBtn];
    
    
    //import cordova webview
#if __has_feature(objc_arc)
    self.cordovaWebView = [[MainViewController alloc] init];
#else
    self.cordovaWebView = [[[MainViewController alloc] init] autorelease];
#endif
    int headHight=44+[UIApplication sharedApplication].statusBarFrame.size.height;
    self.cordovaWebView.view.frame=
    CGRectMake(0,headHight,self.view.frame.size.width, self.view.frame.size.height-headHight);
    
    [self.view addSubview:self.cordovaWebView.view];
    
    UIButton *btnNext=[UIButton buttonWithType:UIButtonTypeCustom];
    btnNext.layer.borderColor=[[UIColor whiteColor] CGColor];
    btnNext.layer.borderWidth=2;
    [btnNext setTitle:@"Next" forState:UIControlStateNormal];
    [btnNext setFrame:CGRectMake(0, 0, 100, 50)];
    btnNext.center=self.view.center;
    [btnNext addTarget:self action:@selector(btnNextClick:) forControlEvents:UIControlEventTouchUpInside];
    // [self.view addSubview:btnNext];
    // Do any additional setup after loading the view.
}

-(void)leftItemClick{
    [[SliderViewController sharedSliderController] leftItemClick];
}
-(void)rightItemClick{
    [[SliderViewController sharedSliderController] rightItemClick];
}
-(void)btnNextClick:(id)sender{
    [[SliderViewController sharedSliderController].navigationController pushViewController:[[ViewController1 alloc] init] animated:YES];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
